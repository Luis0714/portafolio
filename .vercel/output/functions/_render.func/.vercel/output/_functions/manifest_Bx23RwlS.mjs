import 'cookie';
import 'kleur/colors';
import './chunks/astro-designed-error-pages_kAfiIdnD.mjs';
import { d as decodeKey } from './chunks/astro/server_BTy8IswD.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Asus/Documents/Personal/Proyectos/portafolio/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/endpoints/send-email","isIndex":false,"type":"endpoint","pattern":"^\\/endpoints\\/send-email\\/?$","segments":[[{"content":"endpoints","dynamic":false,"spread":false}],[{"content":"send-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/endpoints/send-email.ts","pathname":"/endpoints/send-email","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var u=\"@vercel/analytics\",l=\"1.5.0\",f=()=>{window.va||(window.va=function(...n){(window.vaq=window.vaq||[]).push(n)})};function d(){return typeof window<\"u\"}function s(){try{const e=\"production\"}catch{}return\"production\"}function m(e=\"auto\"){if(e===\"auto\"){window.vam=s();return}window.vam=e}function h(){return(d()?window.vam:s())||\"production\"}function r(){return h()===\"development\"}function v(e){return e.scriptSrc?e.scriptSrc:r()?\"https://va.vercel-scripts.com/v1/script.debug.js\":e.basePath?`${e.basePath}/insights/script.js`:\"/_vercel/insights/script.js\"}function w(e={debug:!0}){var n;if(!d())return;m(e.mode),f(),e.beforeSend&&((n=window.va)==null||n.call(window,\"beforeSend\",e.beforeSend));const a=v(e);if(document.head.querySelector(`script[src*=\"${a}\"]`))return;const t=document.createElement(\"script\");t.src=a,t.defer=!0,t.dataset.sdkn=u+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.disableAutoTrack&&(t.dataset.disableAutoTrack=\"1\"),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(t.dataset.dsn=e.dsn),t.onerror=()=>{const i=r()?\"Please check if any ad blockers are enabled and try again.\":\"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.\";console.log(`[Vercel Web Analytics] Failed to load script from ${a}. ${i}`)},r()&&e.debug===!1&&(t.dataset.debug=\"false\"),document.head.appendChild(t)}var g=\"@vercel/speed-insights\",b=\"1.2.0\",k=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function S(){return typeof window<\"u\"}function y(){try{const e=\"production\"}catch{}return\"production\"}function c(){return y()===\"development\"}function $(e){return e.scriptSrc?e.scriptSrc:c()?\"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js\":e.dsn?\"https://va.vercel-scripts.com/v1/speed-insights/script.js\":e.basePath?`${e.basePath}/speed-insights/script.js`:\"/_vercel/speed-insights/script.js\"}function j(e={}){var n;if(!S()||e.route===null)return null;k();const a=$(e);if(document.head.querySelector(`script[src*=\"${a}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=a,t.defer=!0,t.dataset.sdkn=g+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=b,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/speed-insights/vitals`),e.dsn&&(t.dataset.dsn=e.dsn),c()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${a}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:i=>{t.dataset.route=i??void 0}}}w();j();(function(){const e=document.getElementById(\"theme-toggle\"),n=document.documentElement,a=()=>{const i=localStorage.getItem(\"theme\");return i||(window.matchMedia(\"(prefers-color-scheme: dark)\").matches?\"dark\":\"light\")},t=i=>{i===\"dark\"?n.classList.add(\"dark\"):n.classList.remove(\"dark\"),localStorage.setItem(\"theme\",i)};t(a()),e?.addEventListener(\"click\",()=>{const o=(n.classList.contains(\"dark\")?\"dark\":\"light\")===\"dark\"?\"light\":\"dark\";t(o)}),window.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener(\"change\",i=>{localStorage.getItem(\"theme\")||t(i.matches?\"dark\":\"light\")})})();\n"}],"styles":[{"type":"external","src":"/_astro/index._w-4ASzh.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://estremor.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Asus/Documents/Personal/Proyectos/portafolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/endpoints/send-email@_@ts":"pages/endpoints/send-email.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","C:/Users/Asus/Documents/Personal/Proyectos/portafolio/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_Bx23RwlS.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.mjtFny0u.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/onest-latin-wght-normal.DJzCSW5i.woff2","/_astro/onest-cyrillic-wght-normal.CiQTuMoU.woff2","/_astro/onest-latin-ext-wght-normal.0BME-IPC.woff2","/_astro/index._w-4ASzh.css","/preview.webp","/robots.txt","/images/favicon.ico","/images/favicon.svg","/images/logo-diabecare.webp","/images/logo-ecommerce.webp","/images/logo-home-heal.webp","/images/logo-tomansy.webp","/images/luisandres.jpg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"PTDKil32Yg1yJADHRzLCgYooB0WfpI+nB1xN2do5umU=","experimentalEnvGetSecretEnabled":false});

export { manifest };
