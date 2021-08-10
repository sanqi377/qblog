<?php

namespace app\admin\controller;

class Personal extends Error
{
    public function getInfo()
    {
        $data = $this->db('info')->select();
        return json(['ret' => 200, 'data' => $data[0]]);
    }

    public function saveInfo()
    {
        $param = input('post.');
        $this->db('info')->save($param);
        return json(['ret' => 200, 'data' => '保存成功']);
    }
}
