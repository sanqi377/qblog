<?php

namespace app\index\controller;

class Comment extends Common
{
    public function addComment()
    {
        $param = input('post.');
        $param['add_time'] = time();
        $this->db('remark')->insert($param);
        return json(['ret' => 200, 'data' => "评论成功"]);
    }

    public function getComment()
    {
        $param = input('post.');
        $where = [];
        $where['article_id'] = $param['id'];
        $data = $this->db('remark')->where($where)->order('id', 'asc')->select();
        $data1 = $this->db('reply')->order('id', 'asc')->select();
        $remark = [];
        $count = 0;
        foreach ($data as &$v) {
            $v['children'] = [];
            for ($x = 0; $x < count($data1); $x++) {
                if ($v['id'] == $data1[$x]['remark_id']) {
                    array_push($v['children'], $data1[$x]);
                    $count++;
                }
            }
            array_push($remark, $v);
        }
        $count = $this->db('remark')->where($where)->count() + $count;
        return json(['ret' => 200, 'data' => $remark, 'count' => $count]);
    }

    public function addReply()
    {
        $param = input('post.');
        $param['add_time'] = time();
        $this->db('reply')->insert($param);
        return json(['ret' => 200, 'data' => "回复成功"]);
    }
}
