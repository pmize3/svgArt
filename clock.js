var clock = d3.select('body');
var width = 960,
    height = 960,
    radius = 500;

var radii = {
    "months": radius / 2,
    "days": radius / 2 - 50,
    "hours": radius / 2 - 100,
    "minutes": radius / 2 - 150,
    "seconds": radius / 2 - 200
};

var svg = clock.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height /2 + ")");

// Months
svg.append("circle")
    .attr("class", "months")
    .attr("r", radii.months)
    .style("fill", "none")
    .style("stroke" , "rgba(255, 204, 0, 0.25");

// Days
svg.append("circle")
    .attr("class", "days")
    .attr("r", radii.days)
    .style("fill", "none")
    .style("stroke" , "rgba(255, 204, 0, 0.25");

// Hours
svg.append("circle")
    .attr("class", "hours")
    .attr("r", radii.hours)
    .style("fill", "none")
    .style("stroke" , "rgba(255, 204, 0, 0.25");

// Minutes
svg.append("circle")
    .attr("class", "minutes")
    .attr("r", radii.minutes)
    .style("fill", "none")
    .style("stroke" , "rgba(255, 204, 0, 0.25");

// Seconds
svg.append("circle")
    .attr("class", "seconds")
    .attr("r", radii.seconds)
    .style("fill", "none")
    .style("stroke" , "rgba(255, 204, 0, 0.25");

// Current position of Months
var monthsPosition = d3.svg.arc()
    .outerRadius(radii.months + 1)
    .innerRadius(radii.months - 1)
    .startAngle(0)
    .endAngle(0);
svg.append("path")
    .attr("class", "monthsPosition")
    .attr("d", monthsPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

// Current position of Days
var daysPosition = d3.svg.arc()
    .outerRadius(radii.days + 1)
    .innerRadius(radii.days - 1)
    .startAngle(0)
    .endAngle(0);
svg.append("path")
    .attr("class", "daysPosition")
    .attr("d", daysPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

// Current position of Hours
var hoursPosition = d3.svg.arc()
    .outerRadius(radii.hours + 1)
    .innerRadius(radii.hours - 1)
    .startAngle(0)
    .endAngle(0);
svg.append("path")
    .attr("class", "hoursPosition")
    .attr("d", hoursPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

// Current position of Minutes
var minutesPosition = d3.svg.arc()
    .outerRadius(radii.minutes + 1)
    .innerRadius(radii.minutes - 1)
    .startAngle(0)
    .endAngle(0);
svg.append("path")
    .attr("class", "minutesPosition")
    .attr("d", minutesPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

// Current position of Seconds
var secondsPosition = d3.svg.arc()
    .outerRadius(radii.seconds + 1)
    .innerRadius(radii.seconds - 1)
    .startAngle(0)
    .endAngle(0);
svg.append("path")
    .attr("class", "secondsPosition")
    .attr("d", secondsPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

// Update the clock every second
setInterval(function () {
    now = new Date();

    var interpolateMonthsPosition =
        d3.interpolate(
            monthsPosition.endAngle()(),
            (2 * Math.PI * d3.time.months(d3.time.year.floor(now), now).length /
            d3.time.months(d3.time.year.floor(now),
                d3.time.year.ceil(now)).length));

    var interpolateDaysPosition =
        d3.interpolate(
            daysPosition.endAngle()(),
            (2 * Math.PI * d3.time.days(d3.time.month.floor(now), now).length /
            d3.time.days(d3.time.month.floor(now),
                d3.time.month.ceil(now)).length));

    var interpolateHoursPosition =
        d3.interpolate(
            hoursPosition.endAngle()(),
            (2 * Math.PI * d3.time.hours(d3.time.day.floor(now), now).length /
            d3.time.hours(d3.time.day.floor(now),
                d3.time.day.ceil(now)).length));

    var interpolateMinutesPosition =
        d3.interpolate(
            minutesPosition.endAngle()(),
            (2 * Math.PI * d3.time.minutes(d3.time.hour.floor(now), now).length /
            d3.time.minutes(d3.time.hour.floor(now),
                d3.time.hour.ceil(now)).length));
                
    var interpolateSecondsPosition =
        d3.interpolate(
            secondsPosition.endAngle()(),
            (2 * Math.PI * d3.time.seconds(d3.time.minute.floor(now), now).length /
            d3.time.seconds(d3.time.minute.floor(now),
                d3.time.minute.ceil(now)).length));

    d3.transition().duration(500).tween("orbit", function () {
        return function (t) {
            // Animate Months
            d3.select(".monthsPosition").attr("d", monthsPosition.endAngle(interpolateMonthsPosition(t)));

            // Transition Months
            d3.select().attr("transform", "translate(" + radii.months * Math.sin(
                interpolateMonthsPosition(t) - monthsPosition.startAngle()()) + "," + -radii.months * Math.cos(
                    interpolateMonthsPosition(t) - monthsPosition.startAngle()()) + ")");

            // Animate Days
            d3.select(".daysPosition").attr("d", daysPosition.endAngle(interpolateDaysPosition(t)));

            // Transition Days
            d3.select().attr("transform", "translate(" + radii.days * Math.sin(
                interpolateDaysPosition(t) - daysPosition.startAngle()()) + "," + -radii.days * Math.cos(
                    interpolateDaysPosition(t) - daysPosition.startAngle()()) + ")");

            // Animate Hours
            d3.select(".hoursPosition").attr("d", hoursPosition.endAngle(interpolateHoursPosition(t)));

            // Transition Hours
            d3.select().attr("transform", "translate(" + radii.hours * Math.sin(
                interpolateHoursPosition(t) - hoursPosition.startAngle()()) + "," + -radii.hours * Math.cos(
                    interpolateHoursPosition(t) - hoursPosition.startAngle()()) + ")");
                    
            // Animate Minutes
            d3.select(".minutesPosition").attr("d", minutesPosition.endAngle(interpolateMinutesPosition(t)));

            // Transition Minutes
            d3.select().attr("transform", "translate(" + radii.minutes * Math.sin(
                interpolateMinutesPosition(t) - minutesPosition.startAngle()()) + "," + -radii.minutes * Math.cos(
                    interpolateMinutesPosition(t) - minutesPosition.startAngle()()) + ")");
                    
            // Animate Seconds
            d3.select(".secondsPosition").attr("d", secondsPosition.endAngle(interpolateSecondsPosition(t)));

            // Transition Seconds
            d3.select().attr("transform", "translate(" + radii.seconds * Math.sin(
                interpolateSecondsPosition(t) - secondsPosition.startAngle()()) + "," + -radii.seconds * Math.cos(
                    interpolateSecondsPosition(t) - secondsPosition.startAngle()()) + ")");
        };
    });
}, 1000);