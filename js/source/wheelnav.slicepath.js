﻿//---------------------------------
// Slice path definitions
//---------------------------------

var slicePath = function () {

    this.startAngle = 0;
    this.startTheta = 0;
    this.middleTheta = 0;
    this.endTheta = 0;
    this.titlePosX = 0;
    this.titlePosY = 0;
    this.titleSugar = 0;
    this.titleBaseLinePath = "";
    this.r = 0;

    var setBaseValue = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {
        this.r = rOriginal * percent;
        this.startAngle = (itemIndex * sliceAngle) + baseAngle;
        this.startTheta = getTheta(startAngle);
        this.middleTheta = getTheta(startAngle + sliceAngle / 2);
        this.endTheta = getTheta(startAngle + sliceAngle);
        this.titleSugar = r * 0.5;
        setTitlePos(x, y);
    }

    var setTitlePos = function (x, y) {
        this.titlePosX = titleSugar * Math.cos(middleTheta) + x;
        this.titlePosY = titleSugar * Math.sin(middleTheta) + y;
    }

    var getTheta = function (angle) {
            return (angle % 360) * Math.PI / 180;
    }

    this.nullSlice = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {
        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);
        return {
            slicePathString: "",
            linePathString: "",
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    this.defaultPie = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {
       
        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);
        slicePathString = [["M", x, y],
                     ["L", r * Math.cos(startTheta) + x, r * Math.sin(startTheta) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(endTheta) + x, r * Math.sin(endTheta) + y],
                     ["z"]];

        return {
            slicePathString: slicePathString,
            linePathString: "",
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    this.defaultStar = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {

        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);
        rbase = r * 0.5;

        slicePathString = [["M", x, y],
                     ["L", (rbase * Math.cos(startTheta)) + x, (rbase * Math.sin(startTheta)) + y],
                     ["L", r * Math.cos(middleTheta) + x, r * Math.sin(middleTheta) + y],
                     ["L", (rbase * Math.cos(endTheta)) + x, (rbase * Math.sin(endTheta)) + y],
                     ["z"]];

        titleSugar = r * 0.44;
        setTitlePos(x, y);

        return {
            slicePathString: slicePathString,
            linePathString: "",
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    this.defaultStarSpread = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {

        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);
        rbase = rOriginal * 0.5;

        if (percent > 0.1) {
            slicePathString = [["M", x, y],
                         ["L", (rbase * Math.cos(startTheta)) + x, (rbase * Math.sin(startTheta)) + y],
                         ["L", r * Math.cos(middleTheta) + x, r * Math.sin(middleTheta) + y],
                         ["L", (rbase * Math.cos(endTheta)) + x, (rbase * Math.sin(endTheta)) + y],
                         ["z"]];
        }
        else
        {
            slicePathString = [["M", x, y]];
        }

        titleSugar = r * 0.44;
        setTitlePos(x, y);

        return {
            slicePathString: slicePathString,
            linePathString: "",
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    this.defaultCog = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {

        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);
        rbase = r * 0.95;

        theta1 = getTheta(startAngle + sliceAngle * 0.0625);
        theta2 = getTheta(startAngle + sliceAngle * 0.1875);
        theta3 = getTheta(startAngle + sliceAngle * 0.3125);
        theta4 = getTheta(startAngle + sliceAngle * 0.4375);
        theta5 = getTheta(startAngle + sliceAngle * 0.5625);
        theta6 = getTheta(startAngle + sliceAngle * 0.6875);
        theta7 = getTheta(startAngle + sliceAngle * 0.8125);
        theta8 = getTheta(startAngle + sliceAngle * 0.9375);

        slicePathString = [["M", x, y],
                     ["L", r * Math.cos(startTheta) + x, r * Math.sin(startTheta) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(theta1) + x, r * Math.sin(theta1) + y],
                     ["L", rbase * Math.cos(theta1) + x, rbase * Math.sin(theta1) + y],
                     ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta2) + x, rbase * Math.sin(theta2) + y],
                     ["L", r * Math.cos(theta2) + x, r * Math.sin(theta2) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(theta3) + x, r * Math.sin(theta3) + y],
                     ["L", rbase * Math.cos(theta3) + x, rbase * Math.sin(theta3) + y],
                     ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta4) + x, rbase * Math.sin(theta4) + y],
                     ["L", r * Math.cos(theta4) + x, r * Math.sin(theta4) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(theta5) + x, r * Math.sin(theta5) + y],
                     ["L", rbase * Math.cos(theta5) + x, rbase * Math.sin(theta5) + y],
                     ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta6) + x, rbase * Math.sin(theta6) + y],
                     ["L", r * Math.cos(theta6) + x, r * Math.sin(theta6) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(theta7) + x, r * Math.sin(theta7) + y],
                     ["L", rbase * Math.cos(theta7) + x, rbase * Math.sin(theta7) + y],
                     ["A", rbase, rbase, 0, 0, 1, rbase * Math.cos(theta8) + x, rbase * Math.sin(theta8) + y],
                     ["L", r * Math.cos(theta8) + x, r * Math.sin(theta8) + y],
                     ["A", r, r, 0, 0, 1, r * Math.cos(endTheta) + x, r * Math.sin(endTheta) + y],
                     ["z"]];

        titleSugar = r * 0.55;
        setTitlePos(x, y);

        return {
            slicePathString: slicePathString,
            linePathString: "",
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    this.defaultMenu = function (x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent) {

        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, itemIndex, percent);

        titleSugar = r * 0.63;
        setTitlePos(x, y);

        var menuSugar = 25;

        if ((percent * rOriginal) < 25)
        {
            menuSugar = (percent * rOriginal);
        }

        slicePathString = [["M", titlePosX, titlePosY],
                    ["m", -menuSugar, 0],
                    ["a", menuSugar, menuSugar, 0, 1, 0, 2 * menuSugar, 0],
                    ["a", menuSugar, menuSugar, 0, 1, 0, -2 * menuSugar, 0],
                    ["z"]];

        linePathString = [["M", x, y],
                    ["L", titlePosX, titlePosY],
                    ["z"]];

        return {
            slicePathString: slicePathString,
            linePathString: linePathString,
            titlePosX: titlePosX,
            titlePosY: titlePosY
        }
    }

    return this;
}


