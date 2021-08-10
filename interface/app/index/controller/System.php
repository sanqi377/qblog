<?php

namespace app\index\controller;

class System extends Common
{
    public function getDark()
    {
        $param = input('post.');
        if (isset($param['isDark'])) {
            // 用户非第一次进入网站，自行调整过日夜间模式
        } else {
            // 自动判断处于日夜间
            $h = date('H');
            if ($h >= 8 && $h <= 20) {
                $isDark = false;
            } else {
                $isDark = true;
            }
        }
        return json(['ret' => 200, 'data' => $isDark]);
    }
}
