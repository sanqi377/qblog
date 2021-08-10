<?php

namespace app\index\controller;

class Article extends Common
{
    public function getArticleDetails()
    {
        $param = input('post.');
        $data = $this->db('article')->where('id', $param['id'])->order('id', 'desc')->find();
        $remark = $this->db('remark')->where('article_id', $param['id'])->select();
        $array = [];
        foreach ($remark as $v) {
            $reply = $this->db('reply')->where('remark_id', $v['id'])->select();
            foreach ($reply as $k) {
                if ($v['id'] == $k['remark_id']) {
                    array_push($array, $reply);
                }
            }
        }
        $comment = count($remark) + count($array);
        return json(['ret' => 200, 'data' => $data, 'comment' => $comment]);
    }

    public function addViews()
    {
        $param = input('post.');
        $view = $this->db('article')->where('id', (int)$param['id'])->find();
        $this->db('article')->where('id', $param['id'])->update(['views' => $view['views'] += 1]);
        return json(['ret' => 200, 'data' => $view['views'] + 1]);
    }

    public function addLike()
    {
        $param = input('post.');
        $ip = $this->getIp();
        $array = [];
        $array['article_id'] = $param['id'];
        $array['ip'] = $ip;
        $data = $this->db('like_log')->where(['article_id' => $param['id'], 'ip' => $ip])->find();
        if ($data) {
            $this->db('like_log')->where(['article_id' => $param['id'], 'ip' => $ip])->delete();
        } else {
            $this->db('like_log')->save($array);
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    public function getLike()
    {
        $param = input('post.');
        $ip = $this->getIp();
        $status = false;
        $data = $this->db('like_log')->where(['article_id' => $param['id'], 'ip' => $ip])->find();
        if ($data) {
            $status = true;
        }
        $count = $this->db('like_log')->where('article_id', $param['id'])->count();
        return json(['ret' => 200, 'data' => ['status' => $status, 'count' => $count]]);
    }
}
