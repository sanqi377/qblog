<?php

namespace app\index\controller;

class Category extends Common
{
    public function getNavId()
    {
        $param = input('post.');
        $data = $this->db('cats')->where('path', '/' . $param['path'])->field('id')->find();
        return json(['ret' => 200, 'data' => $data]);
    }

    public function getInfo()
    {
        $param = input('post.');
        $data = $this->db('cats')->where('path', '/' . $param['path'])->find();
        return json(['ret' => 200, 'data' => $data]);
    }
}
