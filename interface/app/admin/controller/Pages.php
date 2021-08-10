<?php

namespace app\admin\controller;

class Pages extends Error
{
    public function addPage()
    {
        $param = input('post.');
        $param['add_time'] = time();
        $this->db('pages')->insert($param);
        return json(['ret' => 200, 'data' => '发布成功']);
    }

    public function getPages()
    {
        $data = $this->db('pages')->select();
        return json(['ret' => 200, 'data' => $data]);
    }

    public function deletePages()
    {
        $param = input('post.');
        $this->db('pages')->where('id', $param['id'])->delete();
        return json(['ret' => 200, 'data' => '删除成功']);
    }

    
}
