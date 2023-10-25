<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const gameSetting = {
  maxDuration: 15,
  maxDifficulty: 10,
  minVal: 1,
};

const statistics = ref({
  day: "",
  decided: 0,
  all: 0,
});

const decidedPerc = computed(() => {
  const decide =
    (Number(statistics.value.decided) / Number(statistics.value.all)) * 100;
  return Number(statistics.value.all) === 0 ? 100 : Math.round(decide);
});

const selectedGameSetting = reactive({
  duration: 1,
  difficulty: 1,
  marks: ["addition"],
});

const onSubmit = () => {
  localStorage.setItem("gameSetting", JSON.stringify(selectedGameSetting));
  router.push({ name: "Game" });
};

onMounted(() => {
  let userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : "";
  if (userData) {
    statistics.value.day = userData.day;
    statistics.value.decided = userData.decided;
    statistics.value.all = userData.all;
  }
  if (!userData) {
    userData = {
      day: 1,
      decided: 0,
      all: 0,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  }
});
</script>

<template>
  <div>
    <h1 class="title">Привет</h1>
    <p class="txt">
      Добро пожаловать на {{ statistics.day }} тренировачный день.<br />
      Ваш последний результат - решено {{ statistics.decided }} из
      {{ statistics.all }}<br />
      Общая точность {{ decidedPerc }}%
    </p>
    <q-form class="setting">
      <div>
        <q-slider
          v-model="selectedGameSetting.duration"
          :marker-labels="[
            { value: gameSetting.minVal },
            { value: gameSetting.maxDuration },
          ]"
          switch-marker-labels-side
          :min="gameSetting.minVal"
          :max="gameSetting.maxDuration"
          color="secondary"
        ></q-slider>
        <q-badge color="secondary">
          Длительность {{ selectedGameSetting.duration }} мин.
        </q-badge>
      </div>
      <div>
        <q-slider
          v-model="selectedGameSetting.difficulty"
          :marker-labels="[
            { value: gameSetting.minVal },
            { value: gameSetting.maxDifficulty },
          ]"
          switch-marker-labels-side
          :min="gameSetting.minVal"
          :max="gameSetting.maxDifficulty"
          color="secondary"
        ></q-slider>
        <q-badge color="secondary">
          Сложность {{ selectedGameSetting.difficulty }}
        </q-badge>
      </div>
      <div>
        <q-checkbox
          v-model="selectedGameSetting.marks"
          val="addition"
          label="Суммирование"
          color="secondary"
        ></q-checkbox>
        <q-checkbox
          v-model="selectedGameSetting.marks"
          val="subtraction"
          label="Разность"
          color="secondary"
        ></q-checkbox>
        <q-checkbox
          v-model="selectedGameSetting.marks"
          val="multiplication"
          label="Умножение"
          color="secondary"
        ></q-checkbox>
        <q-checkbox
          v-model="selectedGameSetting.marks"
          val="division"
          label="Деление"
          color="secondary"
        ></q-checkbox>
      </div>
      <q-btn color="secondary" @click="onSubmit()" label="Play"></q-btn>
    </q-form>
  </div>
</template>

<style>
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
