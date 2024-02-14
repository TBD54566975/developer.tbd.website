package website.tbd.developer.site.docs.tbdex

class MockDataProvider {
  private val responses: MutableMap<String, (Array<out Any?>) -> Any> = mutableMapOf()

  // Setup can handle an arbitrary number of parameters
  fun setup(methodName: String, vararg args: Any?) {
      // The last argument is expected to be the response
      val response = args.last() as (Array<out Any?>) -> Any
      val paramsKey = args.dropLast(1).joinToString(prefix = "[", postfix = "]") { it.toString() } // Serialize parameters for key
      val key = "$methodName:$paramsKey"

      responses[key] = response
  }

  // Convenience setup methods
  fun setupInsert(vararg args: Any?) {
      setup("insert", *args)
  }

  fun setupGet(vararg args: Any?) {
      setup("get", *args)
  }

  fun setupQuery(vararg args: Any?) {
      setup("query", *args)
  }

  // Method to find and return the response for the given method and parameters
  suspend fun execute(methodName: String, vararg params: Any?): Any? {
      val paramsKey = params.joinToString(prefix = "[", postfix = "]") { it.toString() }
      val key = "$methodName:$paramsKey"

      return responses[key]?.invoke(params) ?: throw Error("No response found for method $methodName with the given parameters.")
  }

  // Mock methods
  suspend fun insert(vararg params: Any?): Any? {
      // input shouldn't matter for insert, we'll always return okay unless we want to throw an error
      return execute("insert", "")
  }

  suspend fun get(vararg params: Any?): Any? {
      return execute("get", *params)
  }

  suspend fun query(vararg params: Any?): Any? {
      return execute("query", *params)
  }
}
