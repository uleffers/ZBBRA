using System;
using System.IO;
using AutoMapper;

using System.Reflection;
using System.Text.Json.Serialization;
using Database.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ZBBRA.Business.Interfaces;
using ZBBRA.Business;
using ZBBRA.OpenApi;

namespace ZBBRA
{
    public class Startup
    {
        private readonly string _ZBBRACORSPolicy = "zbbracorspolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkSqlServer();
            
            services.AddDbContext<ZbbraDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ZbbraDB")));

            services.AddAutoMapper(typeof(Startup));

            services.AddOptions();
            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            
            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                });
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Values Api", Version = "v1" });
                
#pragma warning disable CS0618
                // Obsolete - is in fixing by microsoft https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/1269
                c.DescribeAllEnumsAsStrings();
#pragma warning restore CS0618

                c.DocumentFilter<ServersDocumentFilter>();
                c.SchemaFilter<AdditionalPropertiesSchemaFilter>();
                
                // XML Documentation
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            
            services.AddTransient<ITransactionManager, TransactionManager>();
            services.AddTransient<IBudgetManager, BudgetManager>();
            services.AddTransient<IBaseInformationManager, BaseInformationManager>();

            services.AddCors(options =>
            {
                options.AddPolicy(_ZBBRACORSPolicy,
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "http://localhost:5000")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseSession();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors(_ZBBRACORSPolicy);

            app.UseAuthorization();

             app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwaggerUi3();


            if (env.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ZBBRA API V1");
                });
            }
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}