"use strict";


var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = "#ffffff";
var SHADOW_GAP = 10;
var SHADOW_COLOR = "rgba(0, 0, 0, 0.7)";
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 150;
var BAR_BOTTOM_Y = 245;
var START_POINT_X = 140;
var MAIN_PLAYER_COLOR = "rgba(255, 0, 0, 1)";
var PLAYER_NAME_Y = 255;
var TIME_SCORE_Y = 225;

var textColor = "#000000";
var textBaseline = "hanging";
var textFont = "16px PT Mono";

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomHslSaturation = function(color, brightness) {
  return (
    "hsl(" + color + ", " + Math.random() * 100 + "%, " + brightness + "%)"
  );
};

var drawBar = function(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var writeText = function(ctx, text, x, y, color, baseline, font) {
  ctx.fillStyle = color;
  ctx.textBaseline = baseline;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function(ctx, names, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  writeText(
    ctx,
    "Ура, вы победили!",
    120,
    30,
    textColor,
    textBaseline,
    textFont
  );
  writeText(
    ctx,
    "Список результатов:",
    120,
    50,
    textColor,
    textBaseline,
    textFont
  );

  for (var i = 0; i < names.length; i++) {
    var barHeight = (times[i] * BAR_MAX_HEIGHT) / maxTime;
    var color = getRandomHslSaturation(240, 70);
    if (names[i] === "Вы") {
      color = MAIN_PLAYER_COLOR;
    }
    drawBar(
      ctx,
      START_POINT_X + i * (BAR_WIDTH + BAR_GAP),
      BAR_BOTTOM_Y - barHeight,
      BAR_WIDTH,
      barHeight,
      color
    );
    writeText(
      ctx,
      Math.floor(times[i]),
      START_POINT_X + i * (BAR_WIDTH + BAR_GAP),
      TIME_SCORE_Y - barHeight,
      textColor,
      textBaseline,
      textFont
    );
    writeText(
      ctx,
      names[i],
      START_POINT_X + i * (BAR_WIDTH + BAR_GAP),
      PLAYER_NAME_Y,
      textColor,
      textBaseline,
      textFont
    );


