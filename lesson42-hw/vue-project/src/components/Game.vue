<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, reactive, computed } from "vue";
import { add, formatDistanceStrict } from "date-fns";

const router = useRouter();

const focusEl = ref(1);

const refs = ref({
  inputFirst: "",
  inputSecond: "",
  inputThird: "",
  time: "1:00",
  result: "",
  mark: "",
  meanMark: "",
});

const meanMarks = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
};

const inputFirstRef = ref();
const inputSecondRef = ref();
const inputThirdRef = ref();

let set = reactive({
  duration: 1,
  difficulty: 1,
  marks: [],
});

let idInterval;

const result = () => {
  debugger;
  switch (refs.value.meanMark) {
    case "+":
      return (
        +refs.value.inputFirst +
        +refs.value.inputSecond +
        +refs.value.inputThird
      );
    case "-":
      return (
        +refs.value.inputFirst -
        +refs.value.inputSecond -
        +refs.value.inputThird
      );
    case "*":
      return (
        +refs.value.inputFirst *
        +refs.value.inputSecond *
        +refs.value.inputThird
      );
    case "/":
      return (
        +refs.value.inputFirst /
        +refs.value.inputSecond /
        +refs.value.inputThird
      );
  }
};

const inpitVal = (val) => {
  if (focusEl.value == 1) {
    debugger;
    return (refs.value.inputFirst += val);
  } else if (focusEl.value == 2) {
    return (refs.value.inputSecond += val);
  } else if (focusEl.value == 3) {
    return (refs.value.inputThird += val);
  } else {
    return "";
  }
};

const onSubmit = () => {
  console.log("submit");
};

const turnNext = () => {
  if (focusEl.value === 1) {
    return inputSecondRef.value.focus(), (focusEl.value = 2);
  } else if (focusEl.value === 2) {
    return inputThirdRef.value.focus(), (focusEl.value = 3);
  } else {
    return inputFirstRef.value.focus(), (focusEl.value = 1);
  }
};

const turnPrev = () => {
  if (focusEl.value === 3) {
    return inputSecondRef.value.focus(), (focusEl.value = 2);
  } else if (focusEl.value === 2) {
    return inputFirstRef.value.focus(), (focusEl.value = 1);
  } else {
    return inputThirdRef.value.focus(), (focusEl.value = 3);
  }
};

const saveGame = (bool) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "");
  if (bool) {
    userData.decided = +userData.decided + 1;
  }
  userData.all = +userData.all + 1;
  localStorage.setItem("userData", JSON.stringify(userData));
};

const randomMark = (marks) => {
  return marks[Math.floor(Math.random() * marks.length)];
};

const newGame = () => {
  refs.value.result = generateRandom(set.difficulty * 10);
  refs.value.mark = randomMark(set.marks);
  refs.value.meanMark = meanMarks[refs.value.mark];
  refs.value.time = set.duration;
  refs.value.inputFirst = "";
  refs.value.inputSecond = "";
  refs.value.inputThird = "";
};

const onTimer = () => {
  const currentTime = new Date();
  const endTime = add(currentTime, { minutes: set.duration });

  idInterval = setInterval(() => {
    const difTimeInSec = parseInt(
      formatDistanceStrict(new Date(), endTime, {
        unit: "second",
      })
    );

    if (difTimeInSec < 60 && difTimeInSec > 0) {
      let formatTime = difTimeInSec < 10 ? "0" + String(difTimeInSec) : difTimeInSec;
      refs.value.time = `0:${formatTime}`;
    } else if (difTimeInSec >= 60) {
      let min = Math.floor(difTimeInSec / 60);
      let sec = difTimeInSec % 60;
      let formatSec = sec < 10 ? "0" + String(sec) : sec;
      refs.value.time = `${min}:${formatSec}`;
      console.log(`${min}:${formatSec}`);
    } else if (difTimeInSec === 0) {
      clearInterval(idInterval);
      router.push({ name: "Setting" });
    }
  }, 1000);
};

onMounted(() => {
  set = JSON.parse(localStorage.getItem("gameSetting") || "");
  inputFirstRef.value.focus();
  newGame();
  onTimer();
});

const generateRandom = (limit = 10) => {
  return Math.floor(Math.random() * limit);
};

const btnEqual = () => {
  let res = result();
  let boolRes = res == refs.value.result;
  newGame();
  saveGame(boolRes);
};

const cancel = () => {
  clearInterval(idInterval);
  router.push({ name: "Setting" });
};
</script>

<template>
  <div>
    <h1 class="title">game</h1>
    <div class="header">
      <q-btn
        class="header_input"
        color="secondary"
        label="Отмена"
        @click="cancel()"
      ></q-btn>
      <q-input
        class="header_input"
        label-color="orange"
        disable
        outlined
        v-model="refs.time"
      ></q-input>
    </div>
    <div class="equation_wrp">
      <div class="equation">
        <q-input
          color="secondary"
          class="equation_el"
          @focus="focusEl = 1"
          ref="inputFirstRef"
          v-model="refs.inputFirst"
        ></q-input>
        <span>{{ refs.meanMark }}</span>
        <q-input
          class="equation_el"
          @focus="focusEl = 2"
          ref="inputSecondRef"
          v-model="refs.inputSecond"
        ></q-input>
        <span>{{ refs.meanMark }}</span>
        <q-input
          class="equation_el"
          @focus="focusEl = 3"
          ref="inputThirdRef"
          v-model="refs.inputThird"
        ></q-input>
      </div>
      <p class="equally">= {{ refs.result }}</p>
      <div class="wrapper">
        <q-btn class="btn" round color="secondary" @click="inpitVal(1)"
          >1</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(2)"
          >2</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(3)"
          >3</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="turnPrev"
          >&lt;</q-btn
        >
      </div>
      <div class="wrapper">
        <q-btn class="btn" round color="secondary" @click="inpitVal(4)"
          >4</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(5)"
          >5</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(6)"
          >6</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="turnNext"
          >&gt;</q-btn
        >
      </div>
      <div class="wrapper">
        <q-btn class="btn" round color="secondary" @click="inpitVal(7)"
          >7</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(8)"
          >8</q-btn
        >
        <q-btn class="btn" round color="secondary" @click="inpitVal(9)"
          >9</q-btn
        >
        <q-btn class="btn" round color="secondary">?</q-btn>
      </div>
      <div class="wrapper">
        <div class="btn"></div>
        <q-btn class="btn" round color="secondary" @click="inpitVal(0)"
          >0</q-btn
        >
        <div class="btn"></div>
        <q-btn class="btn" round color="secondary" @click="btnEqual">=</q-btn>
      </div>
    </div>
  </div>
</template>

<style>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-around;
}
.header_input {
  width: 100px;
}
.equation_wrp {
  max-width: 300px;
  margin: 0 auto;
}
.equation {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.equation_el {
  max-width: 60px;
}
.equally {
  text-align: center;
  margin-top: 10px;
}
.wrapper {
  display: flex !important;
  justify-content: space-around;
  margin-bottom: 10px;
}
.btn {
  width: 42px;
}
</style>
