<?php

namespace app\admin\controller;

class External extends Error
{
    // 一言接口
    public function hitokoto()
    {
        $url = 'https://api.uomg.com/api/rand.qinghua?format=json';
        $result = file_get_contents($url);
        $result = json_decode($result);
        return json(['ret' => 200, 'data' => $result]);
    }

    public function getInfo()
    {
        $articleCount = $this->db('article')->count();
        $remarkCount = $this->db('remark')->count();
        $replyCount = $this->db('reply')->count();
        $commentCount = $remarkCount + $replyCount;
        return json(['ret' => 200, 'data' => ['articleCount' => $articleCount, 'commentCount' => $commentCount]]);
    }
}
