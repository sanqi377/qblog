<?php

namespace app\admin\controller;

class Link extends Error
{
    public function getLink()
    {
        $param = input('post.');
        $data = $this->db('links')->select();
        if (isset($param['id'])) {
            foreach ($data as &$v) {
                if ($param['id'] == $v['id']) {
                    $data = $v;
                }
            }
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    public function addLink()
    {
        $param = input('post.');
        $param['add_time'] = time();
        $this->db('links')->save($param);
        if (isset($param['id'])) {
            $message = "修改成功";
        } else {
            $message = "添加成功";
        }

        return json(['ret' => 200, 'data' => $message]);
    }

    public function deleteLink()
    {
        $param = input('post.');
        $this->db('links')->where('id', (int)$param['id'])->delete();
        return json(['ret' => 200, 'data' => '删除成功']);
    }

    public function changeStatus()
    {
        $param = input('post.');
        $this->db('links')->where('id', $param['id'])->update($param);
        return json(['ret' => 200, 'data' => '修改成功']);
    }
}
