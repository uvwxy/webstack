

struct TestObject {
    1: required string name,
    2: optional string mail
}

service TestService {
    void setObject(1: TestObject t),
    TestObject getObject()
}
