<template>
  <div>
    <h1 class="title">About the app</h1>
    <div>
      <h2 class="subtitle">Description</h2>
      <p>
        Projecting is an easy and intuitive application, and its purpose is to provide to beginner
        developers a tool to support them during the development of their projects.
      </p>
      <p>
        By having all the projects in one place, it allows to monitoring deadlines,
        tasks and other useful resources.
      </p>
    </div>
    <el-divider />
    <div>
      <h2 class="subtitle">Contacts</h2>
      <p>
        <el-link href="https://github.com/longo-andrea/projecting-app">GitHub repository</el-link>
      </p>
      <p>
        <el-link href="http://andreawdev.com/#/">Author webpage</el-link>
      </p>
      <p>
        <el-link href="mailto:longoandrea.dev@gmail.com">Mail</el-link>
      </p>
      <p>
        <el-link href="https://www.instagram.com/andrea.wdev/?hl=it">Instagram page</el-link>
      </p>
    </div>
    <el-divider />
    <div>
      <h2 class="subtitle">License</h2>
      <el-collapse>
        <el-collapse-item title="This software is under MIT License">
          Copyright (c) 2020 longo-andrea
          <br />
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
          <br />
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped lang="scss">
</style>
