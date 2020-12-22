import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ICovidData, IGlobal, ICommonData } from "../../model";
import { IOdjectChart } from "../../model/graph.model";

am4core.useTheme(am4themes_animated);

const Map = (props: {
  data: ICovidData;
  checkAbsolut: boolean;
  updateCheckAbsolut: Function;
  objChart: IOdjectChart;
  updateObject: (
    valueDaily: boolean,
    valueType: string,
    valueCases: string,
    valueColor: string,
    valueCountry: string,
    valueName: string
  ) => void;
  getCountry: (country: string, population: number) => void;
  countryObj: { country: string; populution: number };
}) => {
  const {
    data,
    checkAbsolut,
    updateCheckAbsolut,
    getCountry,
    countryObj,
    objChart,
    updateObject,
  } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const [currentActive, setCurrentActive] = useState<am4maps.MapChart>();
  const chart = useRef(null);
  const map = useRef(null);
  const MapPolygonSeries = useRef(null);
  const mapPolygon = useRef(null);
  const switchData = useRef(null);
  const switchDay = useRef(null);
  const imageSeriesRef = useRef(null);
  const circleImage = useRef(null);

  useEffect(() => {
    updateCheckAbsolut(checked);
  }, [checked]);

  useLayoutEffect(() => {
    let backgroundColor = am4core.color("#1e2128");
    let activeColor = am4core.color("#ff8726");
    let confirmedColor = am4core.color("#d21a1a");
    let recoveredColor = am4core.color("#45d21a");
    let deathsColor = am4core.color("#1c5fe5");

    // for an easier access by key
    let colors = {
      confirmed: confirmedColor,
      recovered: recoveredColor,
      deaths: deathsColor,
    };
    let countryColor = am4core.color("#3b3b3b");
    let countryStrokeColor = am4core.color("#000000");
    let buttonStrokeColor = am4core.color("#ffffff");
    let countryHoverColor = am4core.color("#1b1b1b");

    let container = am4core.create("chartdiv", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.background.fill = backgroundColor;
    container.tooltip = new am4core.Tooltip();
    container.tooltip.background.fill = am4core.color("#000000");
    container.tooltip.background.stroke = activeColor;

    let mapChart = container.createChild(am4maps.MapChart);
    mapChart.width = am4core.percent(100);
    mapChart.height = am4core.percent(100);
    mapChart.align = "center";
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zoomControl.align = "right";
    mapChart.zoomControl.x = 0;
    mapChart.zoomControl.valign = "bottom";
    mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };
    mapChart.y = 50;

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
    polygonTemplate.states.create("active");
    polygonTemplate.states.create("active").properties.fill = activeColor;
    polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.hoverOnFocus = true;
    polygonTemplate.tooltipPosition = "fixed";

    let polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 1400;
    polygonHoverState.properties.fill = countryHoverColor;

    let buttonAndSwitchContainer = container.createChild(am4core.Container);
    buttonAndSwitchContainer.width = am4core.percent(100);
    buttonAndSwitchContainer.layout = 'grid';

    let buttonsContainer = buttonAndSwitchContainer.createChild(am4core.Container);
    buttonsContainer.layout = "grid";
    buttonsContainer.width = am4core.percent(55);
    buttonsContainer.zIndex = 10;
    buttonsContainer.y = 30;

    let imageSeries = mapChart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "TotalConfirmed";
    imageSeriesRef.current = imageSeries;

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;
    imageTemplate.tooltipText = "{Country}: [bold]{value}[/]";

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circleImage.current = circle;

    circle.fill = confirmedColor;

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

    const totalData = data ? data.Global : {};

    const confirmedButton = addButton(
      "confirmed",
      confirmedColor,
      buttonsContainer,
      totalData
    );
    const recoveredButton = addButton(
      "recovered",
      recoveredColor,
      buttonsContainer,
      totalData
    );
    const deathsButton = addButton(
      "deaths",
      deathsColor,
      buttonsContainer,
      totalData
    );

    const buttons = {
      confirmed: confirmedButton,
      recovered: recoveredButton,
      deaths: deathsButton,
    };

    let activeButton = buttons.confirmed;

    function capitalizeFirstLetter(string: string): string {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function changeDataType(name: string) {
      activeButton = buttons[name];
      activeButton.isActive = true;

      Object.keys(buttons).forEach((key) => {
        if (buttons[key] !== activeButton) {
          buttons[key].isActive = false;
        }
      });

      let showData = `${
        mapDaySwitch.isActive ? "New" : "Total"
      }${capitalizeFirstLetter(name)}`;

      updateObject(
        mapDaySwitch.isActive,
        objChart.type,
        name === "confirmed" ? "cases" : name,
        colors[name].hex,
        showData,
        objChart.name
      );

      showData = `${showData}${mapDataSwitch.isActive ? "Relative" : ""}`;
      imageSeries.dataFields.value = showData;
      imageSeries.heatRules.getIndex(0).max = mapDataSwitch.isActive ? 10 : 30;
      imageSeries.invalidateData();

      circle.fill = colors[name];

      imageSeries.tooltip.background.fill = colors[name];
    }

    Object.values(buttons).forEach((btn) => {
      btn.events.on("hit", (e) => {
        changeDataType(e.target.dummyData);
      });
    });

    function addButton(
      name: string,
      color: am4core.Color,
      buttonsContainer: am4core.Container,
      totalData: IGlobal | {}
    ) {
      let button: am4core.Button = buttonsContainer.createChild(am4core.Button);
      button.label.valign = "middle";
      button.label.fill = am4core.color("#1e2128");
      button.label.fontSize = "11px";
      button.background.cornerRadius(30, 30, 30, 30);
      button.background.stroke = buttonStrokeColor;
      button.background.padding(2, 3, 2, 3);
      button.setStateOnChildren = true;

      let circle = new am4core.Circle();
      circle.radius = 8;
      circle.fillOpacity = 0.3;
      circle.fill = color;
      circle.strokeOpacity = 0;
      circle.valign = "middle";
      circle.marginRight = 5;
      button.icon = circle;

      button.dummyData = name;
      const dataOnButton = totalData[`Total${capitalizeFirstLetter(name)}`];

      button.label.text = `${capitalizeFirstLetter(name)}: ${dataOnButton}`;

      return button;
    }

    let switcherContainer = buttonAndSwitchContainer.createChild(am4core.Container);
    switcherContainer.layout = 'grid';
    switcherContainer.width = am4core.percent(45);

    let mapDataSwitch = switcherContainer.createChild(am4core.SwitchButton);
    mapDataSwitch.x = 150;
    mapDataSwitch.leftLabel.text = "Absolute";
    mapDataSwitch.leftLabel.fill = am4core.color("white");
    mapDataSwitch.rightLabel.fill = am4core.color("white");
    mapDataSwitch.rightLabel.text = "Per 100k";
    mapDataSwitch.verticalCenter = "top";
    switchData.current = mapDataSwitch;

    let mapDaySwitch = switcherContainer.createChild(am4core.SwitchButton);
    mapDaySwitch.leftLabel.text = "Total";
    mapDaySwitch.leftLabel.fill = am4core.color("white");
    mapDaySwitch.rightLabel.fill = am4core.color("white");
    mapDaySwitch.rightLabel.text = "Last day";
    mapDaySwitch.verticalCenter = "top";
    switchDay.current = mapDaySwitch;

    mapDataSwitch.events.on("toggled", () => {
      const name = activeButton.dummyData;
      changeDataType(name);
      setChecked(mapDataSwitch.isActive);
    });

    mapDaySwitch.events.on("toggled", () => {
      const name = activeButton.dummyData;
      changeDataType(name);
    });

    function resetHover() {
      polygonSeries.mapPolygons.each((polygon) => {
        const polygonCopy = polygon;
        polygonCopy.isHover = false;
      });

      imageSeries.mapImages.each((image) => {
        const img = image;
        img.isHover = false;
      });
    }

    function rollOverCountry(mapPolygon) {
      resetHover();
      const mapPolygonCopy = mapPolygon;
      if (mapPolygonCopy) {
        mapPolygonCopy.isHover = true;
      }
      const mapPolygonDataContext = mapPolygonCopy.dataItem
        .dataContext as ICommonData;
      const image = imageSeries.getImageById(mapPolygonDataContext.id);
      if (image) {
        (image.dataItem.dataContext as ICommonData).name =
          mapPolygonDataContext.name;
        image.isHover = true;
      }
    }

    function handleCountryHover(e) {
      rollOverCountry(e.target);
    }

    function handleImageHover(e) {
      rollOverCountry(
        polygonSeries.getPolygonById(e.target.dataItem.dataContext.id)
      );
    }

    polygonTemplate.events.on("over", handleCountryHover);
    polygonTemplate.events.on("out", resetHover);

    polygonTemplate.events.on("over", handleImageHover);
    polygonTemplate.events.on("out", resetHover);

    polygonTemplate.events.on("hit", function (ev) {
      const country = data.Countries.find(
        (e) => e.name === (ev.target.dataItem.dataContext as ICommonData).name
      );
      if (country) getCountry(country.id, country.population);
    });

    chart.current = container;
    map.current = mapChart;
    MapPolygonSeries.current = polygonSeries;
    mapPolygon.current = polygonTemplate;

    return () => {
      container.dispose();
    };
  }, [data]);

  useLayoutEffect(() => {
    switchData.current.isActive = checkAbsolut;
    if (countryObj) {
      if (currentActive) currentActive.isActive = false;
      const country = MapPolygonSeries.current.getPolygonById(
        countryObj.country
      );
      setCurrentActive(country);
      map.current.zoomToMapObject(country);
      setTimeout(function () {
        country.isActive = true;
      }, 700);
    }
  }, [countryObj]);
  useLayoutEffect(() => {
    switchData.current.isActive = checkAbsolut;
  }, [checkAbsolut]);
  useLayoutEffect(() => {
    imageSeriesRef.current.dataFields.value = `${objChart.country}${
      switchData.current.isActive ? "Relative" : ""
    }`;
    imageSeriesRef.current.invalidateData();
    imageSeriesRef.current.heatRules.values[0].target.fill = am4core.color(
      objChart.color
    );
  }, [objChart]);
  useLayoutEffect(() => {
    /* switchDay.current.isActive = objChart.daily; */
  }, [objChart.daily]);

  return <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>;
};

export default Map;
