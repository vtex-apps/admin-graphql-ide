"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PropTypes = tslib_1.__importStar(require("prop-types"));
var ts_invariant_1 = require("ts-invariant");
var ApolloConsumer = function (props, context) {
    ts_invariant_1.invariant(!!context.client, "Could not find \"client\" in the context of ApolloConsumer. Wrap the root component in an <ApolloProvider>");
    return props.children(context.client);
};
ApolloConsumer.contextTypes = {
    client: PropTypes.object.isRequired,
};
ApolloConsumer.propTypes = {
    children: PropTypes.func.isRequired,
};
exports.default = ApolloConsumer;
//# sourceMappingURL=ApolloConsumer.js.map