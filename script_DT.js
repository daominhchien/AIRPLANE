const monthNames = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenueData = [2000, 2500, 1800, 2400, 3200, 2800, 3000];

const margin = { top: 20, right: 30, bottom: 30, left: 60 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
  .select("#revenueChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  //thêm một nhóm g vào trong svg để chứa trục x 
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  //d3.scaleBand(): tạo một thang đo tuyến tính, thường dùng cho giá trị liên tục như doanh thu
const x = d3.scaleBand().domain(monthNames).range([0, width]).padding(0.1);
const y = d3
  .scaleLinear()
  .domain([0, d3.max(revenueData)])
  .nice()  //Làm tròn các giới hạn trên trục y (như từ 3200 thành 3500), giúp các giá trị trên trục y dễ đọc và trông trực quan hơn.
  .range([height, 0]);

svg
  .append("g")
  .attr("transform", `translate(0,${height})`)  // di chuyển nhóm g xuống vị trí đáy của biểu đồ, tức là chiều cao của biểu đồ (height)
  .call(d3.axisBottom(x).tickSize(0).tickPadding(10))   //tickPadding: nhãn và đường trục x là 10, nhãn k dính vào trục và dễ đọc hơn 
  .selectAll("text")
  .attr("fill", "#ffffff")
  .attr("font-size", "16px");

svg
  .append("g")
  .call(d3.axisLeft(y).ticks(5))  // đặt số lượng nhãn ticks trên y là 5 cái 
  .selectAll("text")
  .attr("fill", "#ffffff")
  .attr("font-size", "16px");

svg
  .selectAll(".bar")
  .data(revenueData)
  .enter()
  .append("rect") 
  .attr("class", "bar")
  .attr("x", (d, i) => x(monthNames[i]))
  .attr("y", (d) => y(d))
  .attr("width", x.bandwidth())
  .attr("height", (d) => height - y(d))
  .attr("fill", (d, i) => (i === 4 ? "#00aaff" : "#aaddff"))
  .on("mouseover", function (event, d) {
    const tooltip = d3.select("#tooltip");
    const monthIndex = revenueData.indexOf(d);
    tooltip
      .html(`Tháng: ${monthNames[monthIndex]}<br>Doanh thu: ${d}`)
      .style("left", `${event.pageX + 5}px`)
      .style("top", `${event.pageY - 35}px`)
      .style("display", "block")
      .style("opacity", 1);

    d3.select(this).transition().duration(200).attr("fill", "#51c1f9");
  })
  .on("mouseout", function (event, d) {
    d3.select("#tooltip").style("opacity", 0).style("display", "none");

    const index = revenueData.indexOf(d);
    const color = index === 4 ? "#00aaff" : "#aaddff";

    d3.select(this).transition().duration(200).attr("fill", color);
  });

d3.select("body")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background-color", "#03abff")
  .style("color", "#fff")
  .style("padding", "5px")
  .style("border-radius", "5px")
  .style("display", "none")
  .style("opacity", 0);

window.onload = function () {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Phần trăm doanh thu",
    },
    data: [
      {
        type: "pie",
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: 77, label: "Phổ thông", color: "#4a90e2" },
          { y: 23, label: "Thương gia", color: "#e24a4a" },
        ],
      },
    ],
  });
  chart.render();
};
