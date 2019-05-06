<template>
  <div class="VirusEncyclopedia">
    <div class="VirusEncyclopedia_container">
      <h1>特种病毒：面向MEMS结构传感器的声波攻击</h1>
      <ul>
        <li>
          <h2>1、 病毒描述</h2>
          <div class="paragraph">
            <p>面向MEMS结构传感器的声波攻击，利用特定频率声音在MEMS结构加速度传感器内部微型机械结构引起的共振效应，影响传感器内输入模拟信号到输出数字信号的转换过程，并利用了放大器饱和原理和调制原理等多重原理完成对传感器输出量的细致控制。通过对MEMS结构传感器的声波攻击，还可以进一步实现对其附属系统的干扰与控制，比如：</p>
            <ul>
              <li>1）通过声波攻击机械硬盘中的MEMS振动传感器，使得硬盘停止工作，进而使搭载硬盘的电脑系统崩溃，或者监控系统录像存储功能失效；</li>
              <li>2）通过声波攻击无人机上的MEMS陀螺仪，使得无人机停止工作坠落，或者令其移动轨迹发生改变；</li>
              <li>3）通过声波攻击智能平衡车上的MEMS加速度传感器，控制智能平衡车的运动方向与启停工作。</li>
            </ul>
          </div>
        </li>
        <li>
          <h2>2、 基本原理</h2>
          <div class="paragraph">
            <p>面向MEMS结构传感器的声波攻击主要利用声音共振原理，即被攻击对象受外界声波激励，作强迫振动时，当外界激励的声波频率接近系统频率时，强迫振动的幅值达到最大。因此，通过播放在MEMS结构传感器中微机械结构共振频率上的声波信号，可以实现对传感器输出的细致控制。</p>
          </div>
        </li>
        <li>
          <h2>3、 病毒影响范围</h2>
          <div class="paragraph">
            <p>该特种病毒影响范围基本覆盖所有大型MEMS传感器产商，包括STMicroelectronics、Bosch、InvenSen、Murata与Analog Devices等；涵盖具体型号包括且不限于表1。此外，此病毒影响实际系统范围可分为民用领域与军用领域。民用领域主要体现在搭载MEMS传感器的消费电子产品，包括硬盘、VR眼镜、计步器、云台稳定器、平衡车、智能玩具等。军用领域包括军用MEMS陀螺仪、挠性惯导陀螺仪等。</p>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :header-cell-style="{textAlign: 'center'}">
              <el-table-column
                prop="model"
                label="型号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="manufacturer"
                label="所属产商"
                width="180">
              </el-table-column>
              <el-table-column
                prop="purpose"
                label="主要用途">
              </el-table-column>
            </el-table>
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
      tableData: [
        {
          model: 'Bosch - BMA222E',
          manufacturer: 'Bosch',
          purpose: '移动设备，健康设备'
        },
        {
          model: 'STM - MIS2DH',
          manufacturer: 'STMicroelectronics',
          purpose: '心脏起搏器'
        },
        {
          model: 'STM - IIS2DH',
          manufacturer: 'STMicroelectronics',
          purpose: '防盗，工业'
        },
        {
          model: 'STM - LIS3DSH',
          manufacturer: 'STMicroelectronics',
          purpose: '游戏，健康设备'
        },
        {
          model: 'STM - LIS344ALH',
          manufacturer: 'STMicroelectronics',
          purpose: '防盗，游戏'
        },
        {
          model: 'STM - H3LIS331DL',
          manufacturer: 'STMicroelectronics',
          purpose: '振动检测'
        },
        {
          model: 'INVN - MPU6050',
          manufacturer: 'InvenSen',
          purpose: '移动设备，健康设备'
        },
        {
          model: 'INVN - MPU6500',
          manufacturer: 'InvenSen',
          purpose: '移动设备，健康设备'
        },
        {
          model: 'ADI - ADXL312',
          manufacturer: 'Analog Devices',
          purpose: '车载警报'
        },
        {
          model: 'ADI - ADXL335',
          manufacturer: 'Analog Devices',
          purpose: '健康设备，硬盘'
        },
        {
          model: 'ADI - ADXL337',
          manufacturer: 'Analog Devices',
          purpose: '健康设备，硬盘'
        },
        {
          model: 'ADI - ADXL345',
          manufacturer: 'Analog Devices',
          purpose: '防护'
        },
        {
          model: 'Murata - SCA820',
          manufacturer: 'Murata',
          purpose: '自动驾驶汽车'
        },
        {
          model: 'Murata - SCA3100',
          manufacturer: 'Murata',
          purpose: '自动驾驶汽车'
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
  .paragraph p {
    text-indent: 3vw;
  }
  .el-table {
    margin-top: 10px;
  }
</style>
