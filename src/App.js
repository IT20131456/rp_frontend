import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "././components/Profile/changePassword";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Configuration from "./components/Configuration/Configuration";
import TLControllerList from "./components/Configuration/TLControllerList";
import TLConfigurations from "./components/Configuration/TLConfigurations";
import ConfigODM from "./components/Configuration/ConfigODM/ConfigODM";
import ConfigTrafficLight from "./components/Configuration/ConfigTrafficLights/ConfigTrafficLight";
import EVDashbord from "./components/EmergencyVehicle/EVDashbord";
import EVODModelPreview from "./components/EmergencyVehicle/EVODModelPreview";
import EVConfigurations from "./components/EmergencyVehicle/EVConfigurations";
import EVVisualization from "./components/EmergencyVehicle/EVVisualization";
import EVTrafficLightController from "./components/EmergencyVehicle/EVTrafficLightController";
import LEDControl from "./components/Configuration/ConfigTrafficLights/LEDControl";
import JunctionDetails from "./components/JunctionDetails/JunctionDetails";
import CctvVideoLink from "./components/CctvVideo/CctvVideoLink";
import EVTableView from "./components/EmergencyVehicle/EVTableView";


// import GoogleMapView from "./components/GoogleMap/GoogleMapView";
// import GoogleMapAnalyticsView from "./components/GoogleMap/GoogleMapAnalyticsDashboard";
// import GoogleMapViewTest from "./components/GoogleMap/GoogleMapTest";
// import DistanceMatrixView from "./components/GoogleMap/GoogleMapTest2";
// import ModelCall from "./components/GoogleMap/ConnectModel";
// import RoadBTrafficPrediction from "./components/GoogleMap/RoadBTrafficPrediction";
// import LastUpdatedData from "./components/GoogleMap/RetriveData";
// import LineChartRoadB from "./components/GoogleMap/LineChartData";
import TrafficDensityDashboard from "./components/TrafficDensity/TrafficDensityDashboard";
import TrafficSimulation from "./components/TrafficDensity/TrafficSimulation";
import ODMPreview from "./components/TrafficDensity/ODMPreview";
import TrafficControlMethod from "./components/TrafficControlMethod/TrafficControlMethod";
import CurrentTrafficInfo from "./components/TrafficDensity/CurrentTrafficInfo";

// import RoadBSpeedMeter from "./components/GoogleMap/RoadBSpeedMeter";
// import RoadBAll from "./components/GoogleMap/RoadBAllChart";

// import GoogleMapMain from "./components/GoogleMap/GoogleMapMain";
// import RoadXTrafficPrediction from "./components/GoogleMap/RoadXTrafficPrediction";
// import RoadATrafficPrediction from "./components/GoogleMap/RoadATrafficPrediction";
// import RoadMTrafficPrediction from "./components/GoogleMap/RoadMTrafficPrediction";
// import OverallAnalysis from "./components/GoogleMap/OverallAnalysis";
// import OverallMapComponent from "./components/GoogleMap/OverallMapLoad";
// import ActivateModel from "./components/GoogleMap/ActivateGoogleModel";

// import ReportB from "./components/GoogleMap/ReportGenB";
// import ReportX from "./components/GoogleMap/ReportGenX";
// import ReportA from "./components/GoogleMap/ReportGenA";
// import ReportM from "./components/GoogleMap/ReportGenM";

// import GoogleMapLoad from "./components/GoogleMap/GoogleMapLoad";
// import Test1gm from "./components/GoogleMap/test1gm";
// import RoadJunction from "./components/GoogleMap/RoadTrafficCount";
// import ThreeWayJunction from "./components/GoogleMap/ThreeWayJuntionLeft";

// import ThreeWayJunctionR from "./components/GoogleMap/ThreeWayRight";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />        
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/tlcontrollerlist" element={<TLControllerList />} />
        <Route path="/tlconfigurations" element={<TLConfigurations />} />
        <Route path="/configodm" element={<ConfigODM />} />
        <Route path="/configtrafficlight" element={<ConfigTrafficLight />} />
        <Route path="/evdashbord" element={<EVDashbord />} />
        <Route path="/evodmodelpreview" element={<EVODModelPreview/>} />
        <Route path="/evconfigurations" element={<EVConfigurations />} />
        <Route path="/evvisualization" element={<EVVisualization />} />
        <Route path="/evtrafficlightcontroller" element={<EVTrafficLightController />} /> 
        <Route path="/evreports" element={<EVTableView />} /> 
                 
        <Route path="/led" element={<LEDControl />} />

        <Route path="/junctiondetails" element={<JunctionDetails />} />     
        <Route path="/cctvvideolink" element={<CctvVideoLink />} />
        <Route path="/trafficdensitydashboard" element={<TrafficDensityDashboard />} />
        <Route path="/trafficsimulation" element={<TrafficSimulation />} />
        <Route path="/odmPreview" element={<ODMPreview />} />
        <Route path="/trafficcontrolmethod" element={<TrafficControlMethod />} />
        <Route path="/currenttrafficinfo" element={<CurrentTrafficInfo />} />




        {/* <Route path="/map" element={<GoogleMapView />} />
        <Route path="/analytics" element={<GoogleMapAnalyticsView />} />
        <Route path="/maptest" element={<GoogleMapViewTest />} />
        <Route path="/ddd" element={<DistanceMatrixView />} />
        <Route path="/model" element={<ModelCall />} />
        <Route path="/roadb" element={<RoadBTrafficPrediction />} />
        <Route path="/last" element={<LastUpdatedData />} />
        <Route path="/line" element={<LineChartRoadB />} />


           <Route path="/speed" element={<RoadBSpeedMeter />} />
        <Route path="/all" element={<RoadBAll />} />

        <Route path="/mapmain" element={<GoogleMapMain />} />
        <Route path="/roadx" element={<RoadXTrafficPrediction />} />
        <Route path="/roada" element={<RoadATrafficPrediction />} />
        <Route path="/roadm" element={<RoadMTrafficPrediction />} />
        <Route path="/goverall" element={<OverallAnalysis />} />
        <Route path="/overallmap" element={<OverallMapComponent />} />
        <Route path="/Gmactivate" element={<ActivateModel />} />

        <Route path="/reportb" element={<ReportB />} />
        <Route path="/reportx" element={<ReportX />} />
        <Route path="/reporta" element={<ReportA />} />
        <Route path="/reportm" element={<ReportM />} />  */}


        {/* <Route path="/gmapload" element={<GoogleMapLoad />} />
        <Route path="/test1gm" element={<Test1gm />} />
        <Route path="/roadj" element={<RoadJunction />} />
        <Route path="/threeway" element={<ThreeWayJunction />} /> */}



      </Routes>
    </BrowserRouter>
  );
}

export default App;
