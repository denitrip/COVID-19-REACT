import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { fetchCovidData } from '../../services';
import { ICovidData } from '../../model';


am4core.useTheme(am4themes_animated);

const Map = (props:{url:string}) => {
    const {url} = props;
    const [stats, setStats] = useState<ICovidData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchCovidData(url);
          setStats(data);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      }
      fetchData()
    }, [url]);
  
  
    const chart = useRef<any>(null);
  
    useLayoutEffect(() => {
      let x = am4core.create("chartdiv", am4maps.MapChart);
  
      let mapData = stats ? stats.Countries : [];
  
      // Set map definition
      x.geodata = am4geodata_worldLow;
  
      // Set projection
      x.projection = new am4maps.projections.Miller();
  
      // Create map polygon series
      let polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;
  
      let imageSeries = x.series.push(new am4maps.MapImageSeries());
      imageSeries.data = mapData;
      imageSeries.dataFields.value = "value";
  
      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true
  
      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;
      circle.propertyFields.fill = "color";
      circle.tooltipText = "{name}: [bold]{value}[/]";
  
  
      imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 4,
        "max": 30,
        "dataField": "value"
      })
  
    //   imageTemplate.adapter.add("latitude", function (latitude, target) {
    //     let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.CountryCode);
    //     if (polygon) {
    //       return polygon.visualLatitude;
    //     }
    //     return latitude;
    //   })
  
    //   imageTemplate.adapter.add("longitude", function (longitude, target) {
    //     let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.CountryCode);
    //     if (polygon) {
    //       return polygon.visualLongitude;
    //     }
    //     return longitude;
    //   })
  
      chart.current = x;
  
      return () => {
        x.dispose();
      };
    }, [stats]);
  
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
}

export default Map