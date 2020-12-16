import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Map = (props: { data: any, checkAbsolut: boolean, updateCheckAbsolut: Function }) => {
  const { data, checkAbsolut, updateCheckAbsolut } = props;
  const [checked, setCheked] = useState<boolean>(false);

  // console.log(data)

  const chart = useRef<any>(null);
  useEffect(() => { updateCheckAbsolut(checked) }, [checked])

  useLayoutEffect(() => {
    let activeColor = am4core.color("#ff8726");
    let confirmedColor = am4core.color("#d21a1a");
    let recoveredColor = am4core.color("#45d21a");
    let deathsColor = am4core.color("#1c5fe5");

    // for an easier access by key
    let colors = {
      TotalConfirmed: confirmedColor,
      TotalRecovered: recoveredColor,
      TotalDeaths: deathsColor,
    };

    let countryColor = am4core.color("#3b3b3b");
    let countryStrokeColor = am4core.color("#000000");
    let buttonStrokeColor = am4core.color("#ffffff");
    let countryHoverColor = am4core.color("#1b1b1b");

    let container = am4core.create("chartdiv", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    container.tooltip = new am4core.Tooltip();
    container.tooltip.background.fill = am4core.color("#000000");
    container.tooltip.background.stroke = activeColor;

    let mapChart = container.createChild(am4maps.MapChart);
    mapChart.height = am4core.percent(80);
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zoomControl.align = "right";
    mapChart.zoomControl.marginRight = 15;
    mapChart.zoomControl.valign = "middle";
    mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };

    let mapData = data ? data.Countries : [];

    // Set map definition
    mapChart.geodata = am4geodata_worldLow;

    // Set projection
    mapChart.projection = new am4maps.projections.Miller();
    mapChart.panBehavior = "move";

    mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      "#ffffff"
    );
    mapChart.backgroundSeries.hidden = true;

    // Create map polygon series
    let polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;

    let polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 1400;
    polygonHoverState.properties.fill = countryHoverColor;

    let buttonsContainer = container.createChild(am4core.Container);
    buttonsContainer.layout = "horizontal";
    buttonsContainer.width = am4core.percent(30);
    buttonsContainer.height = am4core.percent(30);
    buttonsContainer.zIndex = 10;

    let imageSeries = mapChart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "TotalConfirmed";

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.tooltipText = "{Country}: [bold]{value}[/]";
    circle.fill = am4core.color("#ffd700");

    imageSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 4,
      max: 30,
      dataField: "value",
    });

    imageTemplate.adapter.add("latitude", function (latitude, target: any) {
      let polygon = polygonSeries.getPolygonById(
        target.dataItem.dataContext.CountryCode
      );
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    });

    imageTemplate.adapter.add("longitude", function (longitude, target: any) {
      let polygon = polygonSeries.getPolygonById(
        target.dataItem.dataContext.CountryCode
      );
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });

    const totalData = data ? data.Global : [];

    function changeDataType(name: string) {
      imageSeries.dataFields.value = name;
      imageSeries.invalidateData();

      circle.fill = colors[name];
    }

    function addButton(name: string, color: any) {
      let button: am4core.Button = buttonsContainer.createChild(am4core.Button);
      button.label.valign = "middle";
      button.label.fill = am4core.color("#ffffff");
      button.label.fontSize = "11px";
      button.background.cornerRadius(30, 30, 30, 30);
      button.background.stroke = buttonStrokeColor;
      button.background.padding(2, 3, 2, 3);
      button.setStateOnChildren = true;

      let circle2 = new am4core.Circle();
      circle2.radius = 8;
      circle2.fillOpacity = 0.3;
      circle2.fill = color;
      circle2.strokeOpacity = 0;
      circle2.valign = "middle";
      circle2.marginRight = 5;
      button.icon = circle2;

      button.dummyData = name;
      const dataOnButton = totalData[name];

      button.label.text = `${name.slice(5)}: ${dataOnButton}`;

      button.events.on("hit", (e) => {
        changeDataType(e.target.dummyData);
      });

      return button;
    }
    addButton("TotalConfirmed", confirmedColor);
    addButton("TotalRecovered", recoveredColor);
    addButton("TotalDeaths", deathsColor);

    let mapGlobeSwitch = mapChart.createChild(am4core.SwitchButton);
    mapGlobeSwitch.align = "right";
    mapGlobeSwitch.y = 15;
    mapGlobeSwitch.leftLabel.text = "Absolute";
    mapGlobeSwitch.leftLabel.fill = am4core.color("#ffffff");
    mapGlobeSwitch.rightLabel.fill = am4core.color("#ffffff");
    mapGlobeSwitch.rightLabel.text = "Per 100k";
    mapGlobeSwitch.verticalCenter = "top";
    mapGlobeSwitch.events.on("toggled", function () {
      setCheked(mapGlobeSwitch.isActive)
    })
    chart.current = container;

    return () => {
      container.dispose();
    };
  }, [data]);

  useLayoutEffect(() => {
    chart.current.isActive = checkAbsolut;
  }, [checkAbsolut]);

  return (
    <div
      // className={props.className}
      id="chartdiv"
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
};

export default Map;
