<?php

namespace app\index\controller;

class External extends Common
{
    public function getPoetry()
    {
        $url = 'https://v1.jinrishici.com/all';
        $result = file_get_contents($url);
        $result = json_decode($result);
        return json(['ret' => 200, 'data' => $result]);
    }

    public function getMusic()
    {
        $param = input('post.');
        $url = 'http://api.uomg.com/api/rand.music?mid=' . $param['id'] . '&format=json';
        $result = file_get_contents($url);
        $result = json_decode($result);
        return json(['ret' => 200, 'data' => $result]);
    }

    // B 站相关
    public function blibli()
    {
        $url = "https://api.bilibili.com/x/space/acc/info?mid=403379471";
        $userInfo = $this->curl($url)->data; // 用户信息

        $url1 = "https://api.bilibili.com/x/relation/stat?vmid=403379471";
        $follower = $this->curl($url1)->data; // 粉丝信息

        $url2 = "https://api.bilibili.com/x/space/arc/search?mid=403379471";
        $video = $this->curl($url2)->data; // 视频信息

        $pic = $this->db('article')->select();
        foreach ($video->list->vlist as $idx => &$v) {
            for ($i = 0; $i < count($video->list->vlist); $i++) {
                if ($idx == $i) {
                    $v->top_pic = $pic[$i]['top_pic'];
                }
            }
        }
        return json(['ret' => 200, 'data' => ['userInfo' => $userInfo, 'follower' => $follower, 'video' => $video]]);
    }
}
