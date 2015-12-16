declare var global: any;

describe("tsenv", () => {
    describe("__extends", () => {
        it("should handle null", () => {
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                return Foo;
            })(null);
            var foo = new Foo();
            expect(foo instanceof Foo).toBeTruthy();
        });

        it("should handle inheritance", () => {
            var Bar: any = (function() {
                function Bar() {
                }
                return Bar;
            })();
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                return Foo;
            })(Bar);
            var foo = new Foo();
            expect(foo instanceof Bar).toBeTruthy();
            expect(foo instanceof Foo).toBeTruthy();
        });

        it("should add super methods", () => {
            var Bar: any = (function() {
                function Bar() {
                }
                Bar.prototype.bar = function() {
                    return "bar";
                };
                return Bar;
            })();
            var Foo: any = (function(__super: any) {
                global.__extends(Foo, __super);
                function Foo() {
                }
                Foo.prototype.foo = function() {
                    return "foo";
                };
                return Foo;
            })(Bar);
            var foo = new Foo();
            expect(foo.bar()).toBe("bar");
            expect(foo.foo()).toBe("foo");
        });
    });
});
