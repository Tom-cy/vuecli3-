 <template>
  <div
    class="code"
    @click="refreshCode"
  >
    <s-identify :identifyCode="identifyCode"></s-identify>
  </div>
</template>

<script>
// npm i identify@0.1.5 图形组件
import SIdentify from '@/component/Baseidentify/identify'
export default {
  components: { SIdentify },
  name: 'codetest',
  data() {
    return {
      identifyCodes: '1234567890',
      identifyCode: ''
    }
  },
  
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    }
  }
}
</script>

<style>
.code {
  /* margin: 400px auto; */
  width: 112px;
  height: 40px;
  /* border: 1px solid red; */
}
</style>