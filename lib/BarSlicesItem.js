'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _withState = require('recompose/withState');

var _withState2 = _interopRequireDefault(_withState);

var _withHandlers = require('recompose/withHandlers');

var _withHandlers2 = _interopRequireDefault(_withHandlers);

var _withPropsOnChange = require('recompose/withPropsOnChange');

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange);

var _core = require('@nivo/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hoverColor = '#e8e9e8';

var BarSlicesItem = function BarSlicesItem(_ref) {
    var slice = _ref.slice,
        x = _ref.x,
        height = _ref.height,
        width = _ref.width,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover;

    return _react2.default.createElement('rect', {
        x: x,
        fill: 'black',
        fillOpacity: isHover ? 0.05 : 0,
        height: height,
        width: width,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip
    });
};

BarSlicesItem.propTypes = {
    slice: _propTypes2.default.object.isRequired,
    height: _propTypes2.default.number.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
    isHover: _propTypes2.default.bool.isRequired,
    theme: _propTypes2.default.object.isRequired
};

var Chip = function Chip(_ref2) {
    var color = _ref2.color;
    return _react2.default.createElement('span', {
        style: {
            display: 'block',
            borderRadius: '50%',
            width: '6px',
            height: '6px',
            background: color
        }
    });
};

var enhance = (0, _compose2.default)((0, _withState2.default)('isHover', 'setIsHover', false), (0, _withPropsOnChange2.default)(['slice', 'theme', 'tooltipFormat'], function (_ref3) {
    var slice = _ref3.slice,
        theme = _ref3.theme,
        tooltipFormat = _ref3.tooltipFormat;

    return {
        tooltip: _react2.default.createElement(_core.TableTooltip, { theme: theme,
            template: slice.data.template,
            rows: slice.tooltipData.map(function (_ref4) {
                var name = _ref4.name,
                    value = _ref4.value,
                    format = _ref4.format,
                    color = _ref4.color;

                return [_react2.default.createElement(Chip, { color: color }), name, tooltipFormat ? tooltipFormat(value, format) : value];
            }) })
    };
}), (0, _withHandlers2.default)({
    showTooltip: function showTooltip(_ref5) {
        var _showTooltip = _ref5.showTooltip,
            setIsHover = _ref5.setIsHover,
            tooltip = _ref5.tooltip;
        return function (e) {
            setIsHover(true);
            _showTooltip(tooltip, e);
        };
    },
    hideTooltip: function hideTooltip(_ref6) {
        var _hideTooltip = _ref6.hideTooltip,
            setIsHover = _ref6.setIsHover;
        return function () {
            setIsHover(false);
            _hideTooltip();
        };
    }
}), _pure2.default);

exports.default = enhance(BarSlicesItem);