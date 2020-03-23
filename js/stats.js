"use strict";

var Cloud = {
  LEFT: 100,
  TOP: 10,
  WIDTH: 420,
  HEIGHT: 270,
  SHADOW_SHIFT: 10,
  BORDER_RADIUS: 10
};

var Colors = {
  RED: "rgba(255, 0, 0, 1)",
  BLACK: "rgb(0, 0, 0)",
  WHITE: "rgb(255, 255, 255)",
  SHADOW: "rgba(0, 0, 0, 0.7)"
};

var Description = {
  STR_HOORAY: "Ура вы победили!",
  STR_RESULTS: "Список результатов: ",
  LEFT: Cloud.LEFT + 30,
  STR_HOORAY_TOP: Cloud.TOP + 40,
  STR_RESULTS_TOP: Cloud.TOP + 65
};

var Column = {
  WIDTH: 40,
  SHIFT: 50,
  LEFT: Cloud.LEFT + 50,
  TOP: Cloud.TOP + 210
};

var FONT = "16px PT Mono";
var YOU = "Вы";
var NAME_SHIFT = 20;
var TIME_SHIFT = 10;

var drawCloudElement = function(ctx, shift, elementColor) {
  ctx.fillStyle = elementColor;
  ctx.beginPath();

  // Хуже этого я придумать не смог:
  ctx.moveTo(shift + Cloud.LEFT + Cloud.BORDER_RADIUS, shift + Cloud.TOP);
  ctx.lineTo(
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS * 2,
    shift + Cloud.TOP
  );
  ctx.quadraticCurveTo(
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS,
    shift + Cloud.TOP,
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS,
    shift + Cloud.TOP + Cloud.BORDER_RADIUS
  );
  ctx.lineTo(
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS * 2
  );
  ctx.quadraticCurveTo(
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS,
    shift + Cloud.LEFT + Cloud.WIDTH - Cloud.BORDER_RADIUS * 2,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS
  );
  ctx.lineTo(
    shift + Cloud.LEFT + Cloud.BORDER_RADIUS,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS
  );
  ctx.quadraticCurveTo(
    shift + Cloud.LEFT,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS,
    shift + Cloud.LEFT,
    shift + Cloud.TOP + Cloud.HEIGHT - Cloud.BORDER_RADIUS * 2
  );
  ctx.lineTo(shift + Cloud.LEFT, shift + Cloud.TOP + Cloud.BORDER_RADIUS);
  ctx.quadraticCurveTo(
    shift + Cloud.LEFT,
    shift + Cloud.TOP,
    shift + Cloud.LEFT + Cloud.BORDER_RADIUS,
    shift + Cloud.TOP
  );
  ctx.stroke();
  ctx.fill();
};

var renderDescription = function(ctx) {
  ctx.fillStyle = Colors.BLACK;
  ctx.font = FONT;
  ctx.fillText(
    Description.STR_HOORAY,
    Description.LEFT,
    Description.STR_HOORAY_TOP
  );
  ctx.fillText(
    Description.STR_RESULTS,
    Description.LEFT,
    Description.STR_RESULTS_TOP
  );
};

var getMaxTime = function(timesArray) {
  var maxTime = timesArray[0];

  for (var i = 0; i < timesArray.length; i++) {
    if (timesArray[i] > maxTime) {
      maxTime = timesArray[i];
    }
  }

  return maxTime;
};

var renderColumn = function(ctx, ColumnParams) {
  ctx.fillRect(
    ColumnParams.left,
    ColumnParams.top - ColumnParams.ColumnHeight,
    Column.WIDTH,
    ColumnParams.ColumnHeight
  );
};

var getBlueColor = function() {
  return "hsl(240, " + Math.floor(Math.random() * 100) + "%, 50%)";
};

var renderName = function(ctx, ColumnParams) {
  ctx.fillStyle = Colors.BLACK;
  ctx.fillText(
    ColumnParams.name,
    ColumnParams.left,
    ColumnParams.top + NAME_SHIFT
  );
};

var renderTime = function(ctx, ColumnParams) {
  ctx.fillStyle = Colors.BLACK;
  ctx.fillText(
    Math.round(ColumnParams.time),
    ColumnParams.leftPos,
    ColumnParams.topPos - TIME_SHIFT - ColumnParams.ColumnHeight
  );
};

window.renderStatistics = function(ctx, names, times) {
  // Рисуем тень (передаём в функцию отступ тени)
  drawCloudElement(ctx, Cloud.SHADOW_SHIFT, Colors.SHADOW);

  // Рисуем облако (без отступа, т.е. он равен 0)
  drawCloudElement(ctx, 0, Colors.WHITE);

  renderDescription(ctx);

  var maxValue = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    var ColumnParams = {
      left: Column.LEFT + (Column.WIDTH + Column.SHIFT) * i,
      top: Column.TOP,
      ColumnHeight: (times[i] / maxValue) * 100,
      name: names[i],
      time: times
    };

    if (names[i] === YOU) {
      ctx.fillStyle = Colors.RED;
    } else {
      ctx.fillStyle = getBlueColor();
    }

    renderColumn(ctx, ColumnParams);
    renderName(ctx, ColumnParams);
    renderTime(ctx, ColumnParams);
  }
};
