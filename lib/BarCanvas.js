'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compute = require('./compute');

var _core = require('@nivo/core');

var _props2 = require('./props');

var _enhance = require('./enhance');

var _enhance2 = _interopRequireDefault(_enhance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the nivo project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
    return nodes.find(function (node) {
        return (0, _core.isCursorInRect)(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
    });
};

var BarCanvas = function (_Component) {
    _inherits(BarCanvas, _Component);

    function BarCanvas() {
        var _temp, _this, _ret;

        _classCallCheck(this, BarCanvas);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleMouseHover = function (showTooltip, hideTooltip) {
            return function (event) {
                if (!_this.bars) return;

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    theme = _this$props.theme;

                var _getRelativeCursor = (0, _core.getRelativeCursor)(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1];

                var bar = findNodeUnderCursor(_this.bars, margin, x, y);

                if (bar !== undefined) {
                    showTooltip(_react2.default.createElement(_core.BasicTooltip, {
                        id: bar.data.id + ' - ' + bar.data.indexValue,
                        value: bar.data.value,
                        enableChip: true,
                        color: bar.color,
                        theme: theme
                    }), event);
                } else {
                    hideTooltip();
                }
            };
        }, _this.handleMouseLeave = function (hideTooltip) {
            return function () {
                hideTooltip();
            };
        }, _this.handleClick = function (event) {
            if (!_this.bars) return;

            var _this$props2 = _this.props,
                margin = _this$props2.margin,
                onClick = _this$props2.onClick;

            var _getRelativeCursor2 = (0, _core.getRelativeCursor)(_this.surface, event),
                x = _getRelativeCursor2[0],
                y = _getRelativeCursor2[1];

            var node = findNodeUnderCursor(_this.bars, margin, x, y);
            if (node !== undefined) onClick(node.data, event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    BarCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d');
        this.draw(this.props);
    };

    BarCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
        if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
            return true;
        } else {
            this.draw(props);
            return false;
        }
    };

    BarCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d');
        this.draw(this.props);
    };

    BarCanvas.prototype.draw = function draw(props) {
        var _this2 = this;

        var data = props.data,
            keys = props.keys,
            getIndex = props.getIndex,
            minValue = props.minValue,
            maxValue = props.maxValue,
            width = props.width,
            height = props.height,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            pixelRatio = props.pixelRatio,
            margin = props.margin,
            layout = props.layout,
            reverse = props.reverse,
            groupMode = props.groupMode,
            padding = props.padding,
            innerPadding = props.innerPadding,
            axisTop = props.axisTop,
            axisRight = props.axisRight,
            axisBottom = props.axisBottom,
            axisLeft = props.axisLeft,
            getColor = props.getColor;


        this.surface.width = outerWidth * pixelRatio;
        this.surface.height = outerHeight * pixelRatio;

        this.ctx.scale(pixelRatio, pixelRatio);

        var options = {
            layout: layout,
            reverse: reverse,
            data: data,
            getIndex: getIndex,
            keys: keys,
            minValue: minValue,
            maxValue: maxValue,
            width: width,
            height: height,
            getColor: getColor,
            padding: padding,
            innerPadding: innerPadding
        };

        var result = groupMode === 'grouped' ? (0, _compute.generateGroupedBars)(options) : (0, _compute.generateStackedBars)(options);

        this.bars = result.bars;

        this.ctx.clearRect(0, 0, outerWidth, outerHeight);
        this.ctx.translate(margin.left, margin.top);

        (0, _core.renderAxesToCanvas)(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width: width,
            height: height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft
        });

        result.bars.forEach(function (_ref) {
            var x = _ref.x,
                y = _ref.y,
                color = _ref.color,
                width = _ref.width,
                height = _ref.height;

            _this2.ctx.fillStyle = color;
            _this2.ctx.fillRect(x, y, width, height);
        });
    };

    BarCanvas.prototype.render = function render() {
        var _this3 = this;

        var _props = this.props,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            pixelRatio = _props.pixelRatio,
            isInteractive = _props.isInteractive,
            theme = _props.theme;


        return _react2.default.createElement(
            _core.Container,
            { isInteractive: isInteractive, theme: theme },
            function (_ref2) {
                var showTooltip = _ref2.showTooltip,
                    hideTooltip = _ref2.hideTooltip;
                return _react2.default.createElement('canvas', {
                    ref: function ref(surface) {
                        _this3.surface = surface;
                    },
                    width: outerWidth * pixelRatio,
                    height: outerHeight * pixelRatio,
                    style: {
                        width: outerWidth,
                        height: outerHeight
                    },
                    onMouseEnter: _this3.handleMouseHover(showTooltip, hideTooltip),
                    onMouseMove: _this3.handleMouseHover(showTooltip, hideTooltip),
                    onMouseLeave: _this3.handleMouseLeave(hideTooltip),
                    onClick: _this3.handleClick
                });
            }
        );
    };

    return BarCanvas;
}(_react.Component);

BarCanvas.propTypes = _props2.BarPropTypes;

exports.default = (0, _enhance2.default)(BarCanvas);