var device_name = "hatakeyama-20211030"
var hosturl = "https://dmqvkjp1l6.execute-api.ap-northeast-1.amazonaws.com/handson"
var apiurl = hosturl + "/datas/" + device_name

//-------------------------------------------
function createChart() {
    reqGet(device_name);
}
//-------------------------------------------
// QueryDyanmo()
//    execute query to DynamoDB
//-------------------------------------------
function reqGet(device_name) {
    console.log("reqGet() start");
    res = $.get(apiurl, function(){

        }).done(function(data){
            jsonData = JSON.stringify(data);
            console.log(jsonData);
            drawChart(data[device_name]);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        });
}
//-------------------------------------------
// drawChart()
//-------------------------------------------
function drawChart(vals) {
    console.log("drawChart() start");
    var val_list = []
    for (i=0; i < vals.length; i++){
      console.log(vals[i])
      var item = {"label": vals[i].timestamp, "y": vals[i].value};
      val_list.push(item)
    }
    //! DrawChart kick
    var canvas = document.getElementById('chart');
    var charts = new CanvasJS.Chart(canvas,
        {
            title:{
                text:"test"
            },
            data:[{
                type:"line",
                dataPoints: val_list
            }]
        });
    charts.render();
}
