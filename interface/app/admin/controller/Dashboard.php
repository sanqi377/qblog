<?php

namespace app\admin\controller;

class Dashboard extends Error

{
    public function trafficRank()
    {
        $data = $this->db('article')->order('views', 'desc')->limit(0, 5)->select()->toArray();
        return json(['ret' => 200, 'data' => $data]);
    }

    public function articleRank()
    {
        $data  = $this->db('article')->whereWeek('add_time')->select()->toArray();
        $array = [0, 0, 0, 0, 0, 0, 0];
        $weeks = [];
        foreach ($data as &$v) {
            $weekArray = array(0, 1, 2, 3, 4, 5, 6);
            $oneD = 24 * 60 * 60;
            $week = $weekArray[date("w", $v['add_time'] + $oneD * 0)];
            $v['week'] = $week;
            array_push($weeks, $v['week']);
            $arr = array_count_values($weeks);
            switch ($v['week']) {
                case 1:
                    $array[1] = $arr[1];
                    break;
                case 2:
                    $array[2] = $arr[2];
                    break;
                case 3:
                    $array[3] = $arr[3];
                    break;
                case 4:
                    $array[4] = $arr[4];
                    break;
                case 5:
                    $array[5] = $arr[5];
                    break;
                case 6:
                    $array[6] = $arr[6];
                    break;
                case 0:
                    $array[0] = $arr[0];
                    break;
            }
        }
        return json(['ret' => 200, 'data' => $array]);
    }

    public function getInfo()
    {
        $article = $this->db('article')->count(); // 文章数
        $views = $this->db('article')->field('views')->select()->toArray();
        $views_count = [];
        foreach ($views as $v) {
            array_push($views_count, $v['views']);
        }
        $views_count = array_sum($views_count); // 浏览量
        $remark = $this->db('remark')->count();
        $reply = $this->db('reply')->count();
        $comment = $remark + $reply; // 评论数

        $like = $this->db('like_log')->count();
        return json(['ret' => 200, 'data' => ['article' => $article, 'views' => $views_count, 'comment' => $comment, 'like' => $like]]);
    }
}
