<template>
  <v-form style="max-width:900px; width:900px;" validate-on="submit lazy" @submit.prevent="submit" class="ma-2">
    <v-text-field
      v-model="title"
      label="제목"
      :rules="[rules.required]"
    ></v-text-field>
    <Ckeditor :editor="editor" v-model="text" :config="editorConfig"></Ckeditor>
    <v-btn type="submit" block class="mt-2">저장</v-btn>
  </v-form>
</template>

<script setup>
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import {
  Table,
  TableColumnResize,
  TableToolbar,
} from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
} from "@ckeditor/ckeditor5-image";

import { ref, watch } from "vue";
import axios from "axios";

let title = ref();
let text = ref();

const emits = defineEmits(["update:modelValue"]);

const rules = {
  required: (value) => !!value || "필수 입력",
  min: (v) => v.length >= 8 || "최소 8자 이상",
  emailMatch: () => `The email and password you entered don't match`,
};
/**
 * v-model 값 연결
 */
watch(text, (newValue, oldValue) => {
  emits("update:modelValue", newValue);
});

// import Upload Adapter
import UploadAdapter from "@/modules/UploadAdapter";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";

// Custom Upload Adapter Plugin function
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Create new object and pass server url
    return new UploadAdapter(loader, "");
  };
  editor.plugins.get("Notification").showWarning("Test!!!!!!!23");
}

const editor = ClassicEditor;

const editorConfig = {
  extraPlugins: [CustomUploadAdapterPlugin],
  height: "200",
  language: "ko",
  plugins: [
    Essentials,
    Bold,
    Italic,
    Link,
    Paragraph,
    BlockQuote,
    Indent,
    List,
    Table,
    TableToolbar,
    TableColumnResize,
    TextTransformation,
    Alignment,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    MediaEmbed,
  ],
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "imageUpload",
      "indent",
      "outdent",
      "numberedList",
      "bulletedList",
      "alignment",
      "blockQuote",
      "mediaEmbed",
      "undo",
      "redo",
      "insertTable",
    ],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "toggleImageCaption",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
    ],
    insert: {
      // If this setting is omitted, the editor defaults to 'block'.
      // See explanation below.
      type: "auto",
    },
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
};


const submit = async function (event) {
  const results = await event;
  if (results.valid) {
    axios
    .post("/api/public/bbs", {
      idx: 0,
      title: title.value,
      contents: text.value,
      atchmnflId: 0,
    })
    .then((res) => {
      alert(res.data.msg);
      clear();
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
  }
};
const clear = () => {
  title.value = "";
  text.value = "";
};
</script>

<style>
.ck.ck-editor {
  width: 100%;
  margin: 0 auto;
}

.ck-editor__editable {
  min-height: 500px !important;
  max-height: 1000px !important;
}
</style>