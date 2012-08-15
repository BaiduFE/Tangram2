<?php
  function factorial($num)
  {
    //初始化数组；
    for ($i=0;$i<10000;$i++)
    {
      $r[$i]=0;   //阶乘结果数组；
      $a[$i]=0;   //进位数组；
    }
    $r[0]=1;  
    $str="";   // 函数返回值初始化为空；
    $M=1;     //对$num求阶乘所得值的位数，初始化为1；
    for ($j=1;$j<=$num;$j++)
    {
      $M+=log10($j);
    }
    for($i=1;$i<=$num;$i++)
    {
      for($k=0;$k<(int)$M;$k++)
      {
        $r[$k]=$r[$k]*$i+$a[$k];
        $a[$k+1]=($r[$k])/10;
        $r[$k]=$r[$k]%10;
      }
    }
    for($i=(int)$M-1;$i>=0;$i--)
    {
      $str.=$r[$i];
    }
    return $str;
  }
  $num = $_REQUEST['num'] + 0;
  if($num <= 1000){
    echo $num.'! = '.factorial($num);
  }else{
    echo '太大了，服务器hold不住！';
  }
?>