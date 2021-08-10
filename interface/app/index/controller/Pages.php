<?php

namespace app\index\controller;

class Pages extends Common
{
    public function getPageInfo()
    {
        $param = input('post.');
        $data = $this->db('cats')->where('path', '/' . $param['path'])->find();
        return json(['ret' => 200, 'data' => $data]);
    }

    public function github()
    {
        $url  =  'https://api.github.com/users/sanqi377/repos';
        $result = $this->curl($url);
        $reposCount = count($result); // 仓库数量
        $startCount = [];
        foreach ($result as $v) {
            array_push($startCount, $v->stargazers_count);
        }
        $startCount = array_sum($startCount); // start 数量

        $commitCount = [];
        $commitDsc = [];
        foreach ($result as $v) {
            $url  =  'https://api.github.com/repos/sanqi377/' . $v->name . '/commits';
            $result = $this->curl($url);
            array_push($commitCount, count($result));
            array_push($commitDsc, $result);
        }
        $commitCount = array_sum($commitCount); // 本周 commit 数量
        return json(['ret' => 200, 'data' => ['reposCount' => $reposCount, 'startCount' => $startCount, 'commitCount' => $commitCount, 'commitDsc' => $commitDsc]]);
    }

    public function getLink()
    {
        $data = $this->db('links')->where('status', 1)->select();
        return json(['ret' => 200, 'data' => $data]);
    }
}
