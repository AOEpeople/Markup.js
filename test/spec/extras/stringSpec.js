describe("Extra string filters", function() {
    describe("should contain", function() {

        // SANITIZE FILTER

        // currently sanitized chars and their replacements
        //   <   is replaced by   &lt;
        //   >   is replaced by   &gt;
        //   &   is replaced by   &amp;
        //   "   is replaced by   &quot;
        //   '   is replaced by   &#39;
        //   /   is replaced by   &#x2F;
        it("a sanitize filter", function() {
            expect(typeof Mark.pipes.sanitize).toBe("function");
        });

        describe("that can sanitizes the following single chars", function() {
            it("should output &lt; when < given", function() {
                expect(Mark.pipes.sanitize('<')).toBe('&lt;');
            });
            it("should output &gt; when > given", function() {
                expect(Mark.pipes.sanitize('>')).toBe('&gt;');
            });
            it("should output &amp; when & given", function() {
                expect(Mark.pipes.sanitize('&')).toBe('&amp;');
            });
            it("should output &quot; when \" given", function() {
                expect(Mark.pipes.sanitize('"')).toBe('&quot;');
            });
            it("should output &#39; when ' given", function() {
                expect(Mark.pipes.sanitize('\'')).toBe('&#39;');
            });
            it("should output &#x2F; when / given", function() {
                expect(Mark.pipes.sanitize('/')).toBe('&#x2F;');
            });
            // should thread the pipe as regex or not as a pipe (thus not replace it)
            it("should output | when | given", function() {
                expect(Mark.pipes.sanitize('|')).toBe('|');
            });
        });

        describe("that can sanitizes the following strings", function() {
            it("should output &lt;script type=&quot;text&#x2F;javascript&quot;&gt;&lt;&#x2F;script&gt;" +
               "when <script type=\"text/javascript\"></script> given", function() {
                expect(Mark.pipes.sanitize('<script type="text/javascript"></script>'))
                    .toBe('&lt;script type=&quot;text&#x2F;javascript&quot;&gt;&lt;&#x2F;script&gt;');
            });
            it("should output &lt;a href=&#39;&#x2F;&#39; onmouseover=&#39;alert(&quot;bad&quot;)&#39;&gt;link&lt;&#x2F;a&gt;" +
            "when <a href='/' onmouseover='alert(\"bad\")'>link</a> given", function() {
                expect(Mark.pipes.sanitize('<a href=\'/\' onmouseover=\'alert("bad")\'>link</a>'))
                    .toBe('&lt;a href=&#39;&#x2F;&#39; onmouseover=&#39;alert(&quot;bad&quot;)&#39;&gt;link&lt;&#x2F;a&gt;');
            });
        });

        // STR_REPLACE FILTER

        it("a str_replace filter", function() {
            expect(typeof Mark.pipes.str_replace).toBe("function");
        });

        describe("that can replace a string with another string", function() {
            var testString = 'This is a :foo: teststring with #different# placeholders and 2000 numbers';

            it("should replace :foo with bar", function() {
                expect(Mark.pipes.str_replace(testString, ':foo', 'bar')).toBe(testString.replace(':foo', 'bar'));
            });

            it("should replace #different# with no", function() {
                expect(Mark.pipes.str_replace(testString, '#different#', 'no')).toBe(testString.replace('#different#', 'no'));
            });

            it("should replace 2000 with 0", function() {
                expect(Mark.pipes.str_replace(testString, '2000', '0')).toBe(testString.replace('2000', '0'));
            });

            it("should just returns the input if the needle cannot be found", function() {
                expect(Mark.pipes.str_replace(testString, 'nonexistingneedle', 'bar')).toBe(testString.replace('nonexistingneedle', 'bar'));
            });
        });

        describe("that can replace multiple strings with another string", function() {
            var testString = 'This 2000 is #different# a :foo teststring 2000 with #different# placeholders :foo 2000 numbers #different#';

            it("should replace :foo with bar two times", function() {
                expect(Mark.pipes.str_replace(testString, ':foo', 'bar', true)).toBe(testString.replace(/:foo/g, 'bar'));
            });

            it("should replace #different# with no three times", function() {
                expect(Mark.pipes.str_replace(testString, '#different#', 'no', true)).toBe(testString.replace(/#different#/g, 'no'));
            });

            it("should replace 2000 with 0 three times", function() {
                expect(Mark.pipes.str_replace(testString, '2000', '0', true)).toBe(testString.replace(/2000/g, '0'));
            });

            it("should just returns the input if the needle cannot be found", function() {
                expect(Mark.pipes.str_replace(testString, 'nonexistingneedle', 'bar', true)).toBe(testString.replace(/nonexistingneedle/g, 'bar'));
            });
        });
    });
});
