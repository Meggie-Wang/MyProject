<template>
  <div class="VirusEncyclopedia">
    <div class="VirusEncyclopedia_container">
      <h1>海豚音病毒</h1>
      <ul>
        <li>
          <h2>1、 病毒描述</h2>
          <div class="paragraph">
            <p>海豚音病毒是一种以超声波为载体的特种病毒。该病毒可以无声地向语音系统注入恶意虚假语音，无法被人耳察觉，具有极高的隐蔽性。</p>
          </div>
        </li>
        <li>
          <h2>2、 基本原理</h2>
          <div class="paragraph">
            <p>语音系统指对语音进行采集和处理的系统，包括智能语音助手、语音识别、声纹识别、语音录制等系统，它们依靠麦克风和声音处理电路等硬件对环境中的声音进行采集。海豚音病毒利用麦克风和声音处理电路的硬件漏洞对语音系统进行无声攻击。具体原理为：攻击者生成恶意语音，将其调制到超声波波段生成海豚音病毒，该病毒利用超声波的人耳不敏感特性实现无声传播，由于麦克风普遍的宽频率响应特性，海豚音病毒可被目标系统的麦克风接收，进而利用麦克风和声音处理电路中的电子元器件的非线性特性产生交调失真，将基带的恶意语音信号降频，从而在电路中产生与可听声音对应的电信号，实现恶意虚假语音的注入。</p>
            <p class="img">
              <img src="./3-1.png" alt="">
              <span>图1  海豚音攻击流程示意图</span>
            </p>
            <p>攻击流程如图1所示。左侧蓝色声波信号为海豚音病毒，对应上方频谱图的高频带部分（>20 kHz）。海豚音病毒被麦克风接受后转换为电信号进入语音系统电路，在经过非线性的麦克风和放大器后产生了低频的交调失真，该失真为虚假的语音信号，对应上方频谱图的红色低频带部分。在经过滤波器之后对应病毒超声波载体的高频信号被滤除，剩余虚假语音信号被模数转换器采样，进入语音系统。</p>
          </div>
        </li>
        <li>
          <h2>3、 病毒影响范围</h2>
          <div class="paragraph">
            <p>海豚音病毒可影响使用MEMS结构麦克风和驻极体式麦克风的语音系统，包括智能手机、平板电脑、智能手表、笔记本电脑、智能音箱、汽车等。已测试受影响的语音系统和设备包括：</p>
            <table>
              <tr>
                <th>设备类型</th>
                <th>厂商</th>
                <th>设备型号</th>
                <th>系统版本</th>
                <th>语音系统</th>
              </tr>
              <tr v-for="(tableData, index) in tableDataList" :key="index">
                <td>{{ tableData.deviceType }}</td>
                <td>
                  <ul>
                    <li v-for="(manufacturer, index) in tableData.manufacturer" :key="index">{{ manufacturer }}</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li v-for="(deviceModel, index) in tableData.deviceModel" :key="index">{{ deviceModel }}</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li v-for="(systemVer, index) in tableData.systemVer" :key="index">{{ systemVer }}</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li v-for="(phoneticSystem, index) in tableData.phoneticSystem" :key="index">{{ phoneticSystem }}</li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
        </li>
        <li>
          <h2>4、 附录：见演示视频</h2>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableDataList: [
        {
          deviceType: '智能手机',
          manufacturer: ['Apple', 'Apple', 'Apple', 'Apple', 'Apple', 'Apple', 'LG', 'Samsung', 'Huawei'],
          deviceModel: ['iPhone 4s', 'iPhone 5s', 'iPhone SE', 'iPhone 6s', 'iPhone 6 plus', 'iPhone 7 plus', 'Nexus 5x', 'Galaxy s6 edge', 'Honor 7'],
          systemVer: ['iOS 9.3.5', 'iOS 10.0.2', 'iOS 10.3.2', 'iOS 10.2.1', 'iOS 10.3.1', 'iOS 10.3.1', 'Android 7.1.1', 'Android 6.0.1', 'Android 6.0'],
          phoneticSystem: ['Siri', 'Siri', 'Siri', 'Siri', 'Siri', 'Siri', 'Google Now', 'S Voice', 'HiVoice']
        },
        {
          deviceType: '智能手表',
          manufacturer: ['Apple'],
          deviceModel: ['watch'],
          systemVer: ['watchOS 3.1'],
          phoneticSystem: ['Siri']
        },
        {
          deviceType: '平板电脑',
          manufacturer: ['Asus', 'Apple'],
          deviceModel: ['Nexus 7', 'iPad mini 4'],
          systemVer: ['Android 6.0.1', 'iOS 10.2.1'],
          phoneticSystem: ['Google Now', 'Siri']
        },
        {
          deviceType: '笔记本电脑',
          manufacturer: ['Apple', 'Lenovo'],
          deviceModel: ['MacBook', 'Thinkpad t440p'],
          systemVer: ['macOS Sierra', 'Windows 10'],
          phoneticSystem: ['Siri', 'Cortana']
        },
        {
          deviceType: '智能音箱',
          manufacturer: ['Amazon'],
          deviceModel: ['Echo'],
          systemVer: ['5589'],
          phoneticSystem: ['Alexa']
        },
        {
          deviceType: '汽车',
          manufacturer: ['Audi'],
          deviceModel: ['Q3'],
          systemVer: ['N/A'],
          phoneticSystem: ['N/A']
        }
      ]
    }
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
  }
  img {
    width: 70%;
  }
  .img > span {
    display: inline-block;
    text-align: center;
    margin-bottom: 10px;
  }
  .paragraph table {
    width: 100%;
    margin-top: 10px;
  }
  .paragraph table th, td {
    border: 1px solid #000;
    text-indent: 10px;
    padding: 5px 0;
  }
  .paragraph table li {
    border-bottom: 1px solid #000;
  }
  .paragraph table li:last-of-type {
    border-bottom: none;
  }
</style>
