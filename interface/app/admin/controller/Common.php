<?php

namespace app\admin\controller;

class Common extends Error
{
    // 图片上传
    public function upload()
    {
        $max = $this->db('system')->where('key', 'max')->find()['value'];
        $files = request()->file('file');
        $size = $max; // 单位 MB
        $size = $size * 1024 * 1024;
        try {
            validate(['file' => ['fileSize:' . $size, 'fileExt:jpg,png,jepg']])->check(['file' => $files]);
            $img_src = \think\facade\Filesystem::disk('public')->putFile('/top_pic', $files);
            return json(['ret' => 200, 'data' => ['msg' => '上传成功', 'src' => $img_src]]);
        } catch (\think\exception\ValidateException $e) {
            return json(['ret' => 200, 'data' => ['msg' => $e->getMessage(), 'error' => true]]);
        }
    }
}
