<script lang="ts">
    import { page } from '$app/stores';
    import moment from 'moment';
    import type { PageData } from './$types.js';
    import type { BoardDetail } from '$lib/type/board/board.js';

    export let data: PageData;
    const board:BoardDetail = data.board;
</script>

  <div class="fc_content content _content_body">
    <div class="fcdeck_container">
      <div class="fcdeck_ct">
        <div class="card on">
          <div class="main_area current">
            <div class="inner">
              <div class="uio_box board_box">
                <h3 class="uio_title theme_color type_block">
                  <span class="uio_title_bullet theme_background"></span>공지사항
                </h3>
                <div data-role="page-container" class="uio_content">
                  <div class="layer _layerPopup">
                    <div class="notice_view">
                      <div class="info _info">
                        <div class="tit_area">
                          <h3 class="tit">{board.title}</h3>
                        </div>
                        <div class="info_detail">
                          <span class="wirter">{board.author}</span>
                          <span class="date">{moment(board.createdAt).format('YYYY.MM.DD')}</span>
                        </div>
                      </div>
                      <div class="content_view">
                        <div class="txt">
                          {@html board.content}
                        </div>
                      </div>
                    </div>
                    <div class="btn_area v2">
                      <a href="/notice" class="btn">목록보기</a>
                      <!-- {#if board.prevId}
                        <a href="/notice/{board.prevId}" class="btn">이전 글</a>
                      {/if}
                      {#if board.nextId}
                        <a href="/notice/{board.nextId}" class="btn next">다음 글</a>
                      {/if} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>