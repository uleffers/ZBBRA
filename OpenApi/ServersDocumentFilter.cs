using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

namespace ZBBRA.OpenApi
{
    /// <summary>
    /// Used to define the available base paths
    /// </summary>
    public class ServersDocumentFilter : IDocumentFilter
    {
        //TODO: Fill summary
        /// <summary>
        /// 
        /// </summary>
        /// <param name="swaggerDoc"></param>
        /// <param name="context"></param>
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Servers = new List<OpenApiServer>
            {
                new OpenApiServer {Url = "https://localhost:44330/", Description = "HTTPS Development application"},
                new OpenApiServer {Url = "http://localhost:5000/", Description = "Development application"},
                new OpenApiServer {Url = "http://localhost:4010/", Description = "prism mock"}
            };
        }
    }
}