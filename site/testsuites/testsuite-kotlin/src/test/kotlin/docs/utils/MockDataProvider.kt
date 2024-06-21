package website.tbd.developer.site.docs.utils

import tbdex.sdk.protocol.models.Offering

class MockDataProvider {
    private val responses: MutableMap<String, (Array<out Any?>) -> Any?> = mutableMapOf()

    // Setup can handle an arbitrary number of parameters
    fun <T> setup(methodName: String, vararg args: Any?, response: (Array<out Any?>) -> T) {
        val paramsKey = args.joinToString(prefix = "[", postfix = "]") { it.toString() } // Serialize parameters for key
        val key = "$methodName:$paramsKey"

        responses[key] = response as (Array<out Any?>) -> Any?
    }

    // Convenience setup methods
    fun setupInsert(vararg args: Any?, response: (Array<out Any?>) -> Any?) {
        setup("insert", *args, response = response)
    }

    fun setupGet(vararg args: Any?, response: (Array<out Any?>) -> Any?) {
        setup("get", *args, response = response)
    }

    fun setupQuery(vararg args: Any?, response: (Array<out Any?>) -> List<Any?>) {
        setup("query", *args, response = response)
    }

    // Method to find and return the response for the given method and parameters
    fun execute(methodName: String, vararg params: Any?): Any {
        val paramsKey = params.joinToString(prefix = "[", postfix = "]") { it.toString() }
        val key = "$methodName:$paramsKey"

        return responses[key]?.invoke(params)
            ?: throw Error("No response found for method $methodName with the given parameters.")
    }

    // Mock methods
    fun insert(collection: String, data: Any): Any {
        return execute("insert", collection, "")
    }

    fun get(collection: String, id: String): Any {
      val result = execute("get", collection, id)
      return if(result is Offering) result.toString() else result
    }

    fun query(collection: String, query: String): List<Any?> {
        return execute("query", collection, query) as List<Any?>
    }
}
