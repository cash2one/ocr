<?php

$GLOBALS['SMARTY_LOCK_FD'] = null;
$GLOBALS['SMARTY_COMPILING_COUNT'] = 0;

class FIS_Template extends Smarty_Internal_Template {

    private $compiling_flag;

    /**
     * decodeProperties
     * @param  [type]  $properties [description]
     * @param  boolean $cache      [description]
     * @return [type]              [description]
     */
    public function decodeProperties($properties, $cache = false)
    {
        $this->has_nocache_code = $properties['has_nocache_code'];
        $this->properties['nocache_hash'] = $properties['nocache_hash'];
        if (isset($properties['cache_lifetime'])) {
            $this->properties['cache_lifetime'] = $properties['cache_lifetime'];
        }
        if (isset($properties['file_dependency'])) {
            $this->properties['file_dependency'] = array_merge($this->properties['file_dependency'], $properties['file_dependency']);
        }
        if (!empty($properties['function'])) {
            $this->properties['function'] = array_merge($this->properties['function'], $properties['function']);
            $this->smarty->template_functions = array_merge($this->smarty->template_functions, $properties['function']);
        }
        $this->properties['version'] = (isset($properties['version'])) ? $properties['version'] : '';
        $this->properties['unifunc'] = $properties['unifunc'];
        // check file dependencies at compiled code
        $is_valid = true;
        if ($this->properties['version'] != Smarty::SMARTY_VERSION) {
            $is_valid = false;
        } else if (((!$cache && $this->smarty->compile_check && empty($this->compiled->_properties) && !$this->compiled->isCompiled) || $cache && ($this->smarty->compile_check === true || $this->smarty->compile_check === Smarty::COMPILECHECK_ON)) && !empty($this->properties['file_dependency'])) {
            foreach ($this->properties['file_dependency'] as $_file_to_check) {
                if ($_file_to_check[2] == 'file' || $_file_to_check[2] == 'php') {
                    if ($this->source->filepath == $_file_to_check[0] && isset($this->source->timestamp)) {
                        // do not recheck current template
                        $mtime = $this->source->timestamp;
                    } else {
                        // file and php types can be checked without loading the respective resource handlers
                        $mtime = @filemtime($_file_to_check[0]);
                    }
                } elseif ($_file_to_check[2] == 'string') {
                    continue;
                } else {
                    $source = Smarty_Resource::source(null, $this->smarty, $_file_to_check[0]);
                    $mtime = $source->timestamp;
                }
                if (!$mtime || $mtime > $_file_to_check[1]) {
                    $is_valid = false;
                    break;
                }
            }
        }
        if ($cache) {
            $this->cached->valid = $is_valid;
        } else {
            // 检测到有文件更新，缓存失效
            if (!$is_valid) {
                if ($GLOBALS['SMARTY_COMPILING_COUNT'] === 0) {
                    // 检查请求是否已经进入独占编译流程，如果没有进入，尝试获取编译锁
                    $GLOBALS['SMARTY_LOCK_FD'] = fopen($this->smarty->getCompileDir() . "/compile_lock", "w+");

                    if (flock($GLOBALS['SMARTY_LOCK_FD'], LOCK_EX | LOCK_NB)) {
                        // 成功获取编译锁
                        error_log("[FIS_SMARTY] " . $this->source->name . " get global locks succ");
                        $GLOBALS['SMARTY_COMPILING_COUNT']++;
                        $this->compiling_flag = true;
                    } else {
                        // 已经有进程在进行编译处理，直接使用老缓存
                        // error_log("[FIS_SMARTY] get global locks failed");
                        // 设置为-1代表获取锁失败，当前请求后续不再尝试编译
                        $GLOBALS['SMARTY_COMPILING_COUNT'] = -1;
                        $is_valid = true;
                    }
                } elseif ($GLOBALS['SMARTY_COMPILING_COUNT'] === -1) {
                    // 请求已经获取锁失败过就不再尝试获取，直接使用老缓存
                    $is_valid = true;
                } elseif ($GLOBALS['SMARTY_COMPILING_COUNT'] > 0) {
                    // 当前编译流程已经加锁，增加计数
                    $GLOBALS['SMARTY_COMPILING_COUNT']++;
                    $this->compiling_flag = true;
                }

            }
            $this->mustCompile = !$is_valid;
        }
        // store data in reusable Smarty_Template_Compiled
        if (!$cache) {
            $this->compiled->_properties = $properties;
        }
        return $is_valid;
    }

    /**
     * Template data object destrutor
     *
     */
    public function __destruct()
    {
        if ($this->compiling_flag === true) {
            $GLOBALS['SMARTY_COMPILING_COUNT']--;
        }
        // 编译完成，释放global_lock，使其他请求可以启动编译流程
        if ($GLOBALS['SMARTY_COMPILING_COUNT'] === 0 && $GLOBALS['SMARTY_LOCK_FD'] !== null) {
            error_log("[FIS_SMARTY] release global locks");
            flock($GLOBALS['SMARTY_LOCK_FD'], LOCK_UN);
            fclose($GLOBALS['SMARTY_LOCK_FD']);
            $GLOBALS['SMARTY_LOCK_FD'] = null;
        }
        parent:: __destruct();
    }
}
?>
