<?php

namespace app\admin\controller;

class System extends Error
{

    /* 
     @api {post} /admin/system/menu  后台菜单列表
     @param string  title   null
     @return array 
    */
    public function menu()
    {
        $param = input('post.');

        if (isset($param['status']) && isset($param['id'])) {
            $where['id'] = $param['id'];
            $this->db('menu')->where($where)->update(['status' => $param['status']]);
            return json(['ret' => 200, 'data' => '修改成功']);
        }

        if (!empty($param['title'])) {
            $where['title'] = $param['title'];
            $data = $this->db('menu')->where($where)->order('sort asc')->select()->toArray();
            return json(['ret' => 200, 'data' => $data]);
        }

        $where = [];

        if (!empty($param['key']) == 'route') {
            $data = $this->db('menu')->where([['pid', '=', 0], ['status', '=', 1]])->field('id,pid,title,icon,path,status,sort,create_time')->order('sort asc')->select()->toArray();
            for ($i = 0; $i < count($data); $i++) {
                $children = $this->db('menu')->where([['pid', '=', $data[$i]['id']], ['status', '=', 1]])->field('id,pid,title,icon,path,status,sort,create_time')->order('sort asc')->select()->toArray();
                $data[$i]['children'] = $children;
            }
            return json(['ret' => 200, 'data' => $data]);
        }

        $data = $this->db('menu')->where([['pid', '=', 0]])->field('id,pid,title,icon,path,status,sort,create_time')->order('sort asc')->select()->toArray();
        for ($i = 0; $i < count($data); $i++) {
            $children = $this->db('menu')->where([['pid', '=', $data[$i]['id']]])->field('id,pid,title,icon,path,status,sort,create_time')->order('sort asc')->select()->toArray();
            $data[$i]['children'] = $children;
        }
        return json(['ret' => 200, 'data' => $data]);
    }

    /* 
     @api {post} /admin/system/loginlog  后台菜单列表
     @param null
     @return array 
    */
    public function loginlog()
    {
        $param = input('post.');
        if (!empty($param['user_name'])) {
            $where['user_name'] = $param['user_name'];
        } else {
            $where = [];
        }
        $data = $this->db('login_log')->where($where)->select()->toArray();
        return json(['ret' => 200, 'data' => $data]);
    }

    /* 
     @api {post} /admin/system/getSystem  获取站点设置
     @param null
     @return array 
    */
    public function getSystem()
    {
        $data = $this->db('system')->select();
        return json(['ret' => 200, 'data' => $data]);
    }

    /* 
     @api {post} /admin/system/siteSave  保存站点设置接口
     @param array  form   nonull
     @return array 
    */
    public function siteSave()
    {
        $param = input('post.');
        $system = $this->db('system')->select();
        foreach ($system as $val) {
            if (isset($param[$val['key']])) {
                $this->db('system')->where('key', $val['key'])->update(['value' => $param[$val['key']]]);
            }
        }
        return json(['ret' => 200, 'data' => ['msg' => '保存成功']]);
    }

    /* 
     @api {post} /admin/system/getDefaultEditor  获取默认编辑器
     @param null
     @return array 
    */
    public function getDefaultEditor()
    {
        $data = $this->db('system')->where('key', 'editor')->find();
        return json(['ret' => 200, 'data' => ['data' => $data['value'], 'msg' => '获取成功']]);
    }
}
