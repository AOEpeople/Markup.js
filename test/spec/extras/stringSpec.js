describe("Extra string filters", function() {
    describe("should contain", function() {
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
    });
});
