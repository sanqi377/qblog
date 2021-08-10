<?php

namespace app\admin\controller;

class Comment extends Error
{
    public function getCommentList()
    {
        $data = $this->db('remark')->order('id', 'desc')->select();
        $data1 = $this->db('reply')->order('id', 'desc')->select()->toArray();
        $remark = [];
        foreach ($data as &$v) {
            $title = $this->db('article')->where('id', $v['article_id'])->field('title')->find();
            $v['title'] = $title['title'];
            $v['children'] = [];
            for ($x = 0; $x < count($data1); $x++) {
                $f_id = $this->db('remark')->where('id', $data1[$x]['remark_id'])->field('article_id')->find();
                $title1 = $this->db('article')->where('id', $f_id['article_id'])->field('title')->find();
                if ($v['id'] == $data1[$x]['remark_id']) {
                    $data1[$x]['title'] = $title1['title'];
                    array_push($v['children'], $data1[$x]);
                }
            }
            array_push($remark, $v);
        }
        return json(['ret' => 200, 'data' => $remark]);
    }

    public function deleteComment()
    {
        $param = input('post.');
        $data = $this->db('reply')->where('id', $param['id'])->find();
        if (!$data) {
            $this->db('remark')->where('id', $param['id'])->delete();
            $this->db('reply')->where('remark_id', $param['id'])->delete();
        } else {
            $this->db('reply')->where('id', $param['id'])->delete();
        }
        return json(['ret' => 200, 'data' => '删除成功']);
    }

    public function editComment()
    {
        $param = input('post.');
        $data = $this->db('remark')->where('id', $param['id'])->find();
        return json(['ret' => 200, 'data' => $data]);
    }
}
