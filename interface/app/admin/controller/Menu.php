<?php

namespace app\admin\controller;

class Menu extends Error
{
    /* 
     @api {post} /admin/menu/delect  删除菜单接口
     @param int  id   don't null
     @return array 
    */
    public function delect()
    {
        $param = input('post.');

        if (!empty($param['id'])) {
            $this->db('menu')->where('id', $param['id'])->delete();
            return json(['ret' => 200, 'data' => ['msg' => '删除成功']]);
        }
    }

    /* 
     @api {post} /admin/menu/save  更改菜单接口
     @param int  id   don't null
     @return array 
    */
    public function menuSave()
    {
        $param = input('post.');

        // 根据主键判断修改还是添加，此为修改
        if (!empty($param['id'])) {
            $where['id'] = $param['id'];
            unset($param['children']);
            $this->db('menu')->where($where)->update($param);
            return json(['ret' => 200, 'data' => ['msg' => '修改成功']]);
        }

        // 此为添加
        $this->db('menu')->insert($param);
        return json(['ret' => 200, 'data' => ['msg' => '添加成功']]);
    }
}
