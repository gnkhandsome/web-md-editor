<template>
  <main id="app">
    <button @click="type === 'md' ? type = 'ed' : type = 'md'">切换</button>
    <div id="editor" v-show="type === 'ed'"></div>
    <!-- <mark-down /> -->
    <!-- <tinymce-editor api-key="API_KEY" :init="{plugins: 'wordcount'}"></tinymce-editor> -->
    <mavon-editor v-model="value" v-show="type === 'md'" />
    <button @click="store(type)">保存</button>
  </main>
</template>

<script>
// import Editor from "@tinymce/tinymce-vue";
// // commonjs require
// // NOTE: default needed after require
// import MarkDown from "vue-meditor";
// import MediumEditor from "medium-editor";
// import editormd from 'editor.md'

import { mavonEditor } from "mavon-editor";
import http from "./utils/api";
export default {
  data() {
    return {
      value: "",
      type: "md",
      quill: ""
    };
  },
  watch: {
    type(val) {
      if (val) {
        document.getElementsByClassName("ql-toolbar")[0].style.display =
          val === "ed" ? "block" : "none";
      }
    }
  },
  components: {
    mavonEditor
  },
  mounted() {
    console.log(http);

    this.type = "ed";
    this.initQuill();
  },
  methods: {
    store(type) {
      if (type === "ed") {
        const html = document.querySelector("#editor").children[0].innerHTML;
        alert(html);
      } else {
        http
          .post("http://api-dev.cjfan.net/cocoachina/api/v1/add_archive", {
            title: "js基础",
            typeid: -1,
            litpic:
              "https://upload-images.jianshu.io/upload_images/200711-a8c434ef6a337207.png",
            keywords: ",window,self,BOOL,NSWindow,",
            description:
              "Cocoachina介绍Core Animation相关的内容也蛮久的了，这次为大家奉献一个简单点的小程序，但是相信你一定用得着：在程序启动时，使用窗口淡入特效将窗口显示出来；在程序关闭或者窗口",
            body: this.value,
            taglists: ["java0001", "MacBook", "游戏"],
            source: "CocoaChina",
            source_url: "http://.......",
            writer: "gagaga003",
            senddate: 1559811228,
            if_markdown: 0,
            ismake: 1,
            arcrank: 0
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    initQuill() {
      var toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ script: "sub" }, { script: "super" }],
        // superscript/subscript
        // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        // [{ direction: "rtl" }], // text direction

        // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        // [{ font: [] }],
        // [{ align: [] }],
        ["link"],
        ["image"],
        ["clean"] // remove formatting button
      ];
      var quill = new Quill("#editor", {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow"
      });
      this.quill = quill;
    }
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  }

  // components: {
  //   MarkDown,
  //   "tinymce-editor": Editor
  // }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
</style>
