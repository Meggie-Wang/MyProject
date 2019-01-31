<template>
  <div class="VirusEncyclopedia">
    <div class="VirusEncyclopedia_container">
      <h1>继电保护器攻击病毒</h1>
      <ul>
        <li>
          <h2>1、 病毒描述</h2>
          <div class="paragraph">
            <p>继电保护器主要是利用电力系统中元件发生短路或异常情况时的电气量的变化构成继电保护动作的原理。大多数情况下，继电保护装置都包括测量部分、逻辑部分、执行部分。 电力系统运行中的参数在正常运行和故障情况时是有明显区别的。继电保护装置就是利用这些参数的变化，在反映、检测的基础上来判断电力系统故障的性质和范围，进而做出相应的反应和处理。正常情况下，用户可以设定电流阈值（例如：当电网中的电流大于该阈值值，继电保护器进行跳闸动作，保证电网的安全运行）。该攻击通过屏蔽用户的设定动作，无论用户将该阈值设定为多少，用户界面显示的电流阈值虽然为用户设置的电流值（例如设置为0.5A），但是实际的电流阈值不会随用户的设定而改变，一直为2A，因此当电网电流大于0.5A时，不会报警、跳闸，造成恶劣影响。</p>
          </div>
        </li>
        <li>
          <h2>2、 基本原理</h2>
          <div class="paragraph">
            <p>攻击者通过植入病毒程序，将用户设定的阈值进行屏蔽处理，虽然用户界面显示的阈值为用户输入值，但实际值并未随用户的输入而改变。</p>
          </div>
        </li>
        <li>
          <h2>3、 病毒影响范围：硬件、平台</h2>
          <div class="paragraph">
            <p>影响范围主要是继电保护装置，从而影响整个电网的安全运行。</p>
          </div>
        </li>
        <li>
          <h2>4、 病毒源关键代码、文件、实例等文件</h2>
          <div class="paragraph">
            <p>见附件：继电保护器_mmi_病毒程序</p>
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
  .paragraph p {
    text-indent: 3vw;
  }
</style>
