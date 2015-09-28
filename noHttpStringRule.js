var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ErrorTolerantWalker = require('./ErrorTolerantWalker');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoHttpStringWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Forbidden http url in string: ';
    return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
var NoHttpStringWalker = (function (_super) {
    __extends(NoHttpStringWalker, _super);
    function NoHttpStringWalker() {
        _super.apply(this, arguments);
    }
    NoHttpStringWalker.prototype.visitNode = function (node) {
        if (node.kind === 8) {
            var stringText = node.text;
            if (/.*http:.*/.test(stringText)) {
                var failureString = Rule.FAILURE_STRING + '\'' + stringText + '\'';
                var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                this.addFailure(failure);
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return NoHttpStringWalker;
})(ErrorTolerantWalker);
//# sourceMappingURL=noHttpStringRule.js.map