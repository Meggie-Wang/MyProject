<template>
  <div class="VirusEncyclopedia">
    <div class="VirusEncyclopedia_container">
      <h1>PLC攻击描述</h1>
      <ul>
        <li>
          <h2>1、 病毒描述</h2>
          <div class="paragraph">
            <p>该病毒攻击的目标为：一套基于PLC的仿真液位控制系统，该控制系统由WinCC监控软件、西门子PLC和被控对象三部分组成，如图1.1所示。被控对象采用MATLAB仿真完成，模拟水箱中的液位变化，通过Advantech公司的PCI-1710数据采集板卡在Matlab与PLC之间进行传感数据与控制数据之间的传输。控制器采用的是西门子PLC S7-300，该PLC对读取的液位等信息进行处理，然后输出控制信息到MATLAB中；同时，PLC读取的现场信息及输出的控制信息，包括液位、水压、阀门状态等都会在上位机中WinCC上显示出，从而我们可以对水箱的实时状态进行监控。一旦水箱中的液位超过了预警值，WinCC会发送警报。</p>
            <p class="img">
              <img src="./4-1.png" alt="">
              <span>图1.1 基于PLC的仿真液位控制系统示意图</span>
            </p>
            <p class="img">
              <img src="./4-2.png" alt="">
              <span>图1.2被控对象示意图</span>
            </p>
            <p>该木马程序，在不影响水箱液位的情况下，频繁的开关出水阀和进水阀从而导致出水阀和进水阀的过度磨损，减少了使用寿命。</p>
            <p>该病毒的使用范围：市面上绝大多数的PLC都可能遭受该种攻击。</p>
          </div>
        </li>
        <li>
          <h2>2、 基本原理</h2>
          <div class="paragraph">
            <p>通过深入分析PLC液位仿真系统的控制逻辑，对PLC所实现生产工艺的详尽分析，找到控制过程中的关键环节，恶意攻击者修改相应的控制工艺，植入恶意操作：修改程序中对应于出水阀和进水阀的代码块，即可实现对工业控制系统中PLC的攻击，并且由于远程监控界面显示正常，使工作人员无法通过远程监视系统了解真实的生产情况，导致攻击方式难以被发现。</p>
          </div>
        </li>
        <li>
          <h2>3、病毒影响范围：硬件、平台</h2>
          <div class="paragraph">
            <p>近年来，根据各个工业行业频发的信息安全事故表明，一直以来被认为相对安全、相对封闭的工业控制系统已经成为不法组织和黑客的攻击目标，黑客攻击正在从开放的互联网向封闭的工控网蔓延。由于PLC的应用十分广泛，所以多个重要且关乎国计民生的行业，如电力、石油、石化、军工等均遭受到了严峻的安全威胁。</p>
          </div>
        </li>
        <li>
          <h2>4、 病毒源关键代码、文件、实例等文件</h2>
          <div class="paragraph">
            <p>见附件：PLC病毒程序</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
  .VirusEncyclopedia {
  }
  .VirusEncyclopedia_container {
    width: 80%;
    margin: 1rem auto 0;
    padding-bottom: 1rem;
  }
  h1 {
    text-align: center;
    font-size: 26px;
  }
  .VirusEncyclopedia > ul > li {
    margin-bottom: 20px;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .paragraph > p {
    text-indent: 3vw;
  }
  .img {
    text-align: center;
    margin-top: 20px;
  }
  .img > span {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
</style>
