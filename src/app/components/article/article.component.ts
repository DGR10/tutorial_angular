import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: any;
  sanitizedContent: SafeHtml | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    // Busca la información del artículo (sin contenido)
    this.article = this.articleService.getArticles().find(a => a.slug === slug);

    if (this.article) {
      // Carga dinámicamente el contenido HTML desde el archivo correspondiente
      this.articleService.getArticleContent(slug).subscribe({
        next: (content) => {
          // Sanitizar el contenido para evitar problemas de seguridad
          this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(content);
        },
        error: (err) => {
          console.error('Error cargando contenido del artículo:', err);
        }
      });
    } else {
      console.error('Artículo no encontrado');
    }
  }
}
