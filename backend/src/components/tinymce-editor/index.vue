<template>
    <div style="margin-top: 10px">
        <editor v-model="content" :init="config" :disabled="disabled" />
    </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/code";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/paste";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/save";
import "tinymce/plugins/autosave";
import "tinymce/plugins/link";
import "tinymce/plugins/autolink";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/codesample";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/hr";
import "tinymce/plugins/charmap";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/anchor";
import "tinymce/plugins/directionality";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/emoticons/js/emojis";

export default {
    name: "MyEditor",
    components: { Editor },
    props: {
        value: String,
        init: Object,
        disabled: Boolean,
    },
    data() {
        return {
            content: "",
            config: Object.assign(
                {
                    height: 650,
                    branding: false,
                    menubar: false,
                    skin_url: "/tinymce/skins/ui/oxide",
                    content_css: "/tinymce/skins/content/default/content.css",
                    language_url: "/tinymce/langs/zh_CN.js",
                    language: "zh_CN",
                    plugins:
                        "code print preview fullscreen paste searchreplace save autosave link autolink image imagetools media table codesample lists advlist hr charmap emoticons anchor directionality pagebreak quickbars nonbreaking visualblocks visualchars wordcount",
                    toolbar:
                        "fullscreen preview code | undo redo | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | formatselect fontselect fontsizeselect | link image media emoticons charmap anchor pagebreak codesample | ltr rtl",
                    toolbar_drawer: "sliding",
                    images_upload_handler: (blobInfo, success) => {
                        console.log(blobInfo);
                        success("data:image/jpeg;base64," + blobInfo.base64());
                    },
                    file_picker_types: "media",
                    file_picker_callback: () => {},
                },
                this.init
            ),
        };
    },
    mounted() {
        tinymce.init({});
    },
    watch: {
        content() {
            this.$emit("change", this.content);
        },
        value() {
            this.content = this.value;
        },
    },
};
</script>

<style>
body .tox-tinymce-aux {
    z-index: 19892000;
}
</style>