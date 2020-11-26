using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ZBBRA.OpenApi
{
    public class AdditionalPropertiesSchemaFilter : ISchemaFilter
    {
        //TODO: Fill summary
        /// <summary>
        /// 
        /// </summary>
        /// <param name="schema"></param>
        /// <param name="context"></param>
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            schema.AdditionalPropertiesAllowed = true;
        }
    }
}