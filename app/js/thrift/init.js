/**
 * Created by uvwxy on 13/07/15.
 */
angular.module(APP_NAME).config(["TestServiceClientProvider", function(TestServiceClientProvider) {
    // provide ThriftTestClient with proper server url
    TestServiceClientProvider.setUrl('/api/testService'); // configure the service url
}]);